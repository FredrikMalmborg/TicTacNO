import React, { FC, useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  useWindowDimensions,
  View,
} from "react-native";

interface ICameraProps {
  windowSize: ISizeState;
}

interface ISizeState {
  width: number;
  height: number;
}

const PanCamera: FC<ICameraProps> = ({ children, ...props }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [size, setSize] = useState<ISizeState>({
    width: 0,
    height: 0,
  });
  const window = useWindowDimensions();
  const windowState = useRef({
    width: props.windowSize.width,
    height: props.windowSize.height,
  });
  const sizeState = useRef(size);

  let localX = 0,
    localY = 0;

  const setViewSize = (event: LayoutChangeEvent) => {
    const { width, x, height, y } = event.nativeEvent.layout;

    setSize((prevState) => ({
      ...prevState,
      width: width + x,
      height: height,
    }));
  };

  const runSpring = (pan: Animated.ValueXY, x: number, y: number) => {
    Animated.spring(pan, {
      useNativeDriver: true,
      toValue: { x, y },
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: localX,
          y: localY,
        });
        pan.setValue({
          x: 0,
          y: 0,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, { vx, vy }) => {
        const { width, height } = sizeState.current;
        const {
          width: windowWidth,
          height: windowHeight,
        } = windowState.current;
        const MARGIN = 0;

        const rightEdge = -localX + windowWidth >= width + MARGIN;
        const leftEdge = localX + windowWidth >= width + MARGIN;
        const topEdge = localY + windowHeight >= height + MARGIN;
        const bottomEdge = -localY + windowHeight >= height + MARGIN;
        const rightX = width > windowWidth ? windowWidth - width : 0;
        const leftX = width > windowWidth ? width - windowWidth : 0;
        const topY =
          height > windowHeight ? height * 0.5 - windowHeight * 0.5 : 0;
        const bottomY =
          height > windowHeight ? windowHeight * 0.5 - height * 0.5 : 0;

        pan.flattenOffset();
        if (topEdge && rightEdge && bottomEdge && leftEdge) {
          runSpring(pan, 0, 0);
        } else if (rightEdge && topEdge && bottomEdge) {
          runSpring(pan, rightX, 0);
        } else if (leftEdge && topEdge && bottomEdge) {
          runSpring(pan, leftX, 0);
        } else if (rightEdge && topEdge) {
          runSpring(pan, rightX, topY);
        } else if (leftEdge && topEdge) {
          runSpring(pan, leftX, topY);
        } else if (rightEdge && bottomEdge) {
          runSpring(pan, rightX, bottomY);
        } else if (leftEdge && bottomEdge) {
          runSpring(pan, leftX, bottomY);
        } else if (topEdge) {
          runSpring(pan, localX, topY);
        } else if (rightEdge) {
          runSpring(pan, rightX, localY);
        } else if (bottomEdge) {
          runSpring(pan, localX, bottomY);
        } else if (leftEdge) {
          runSpring(pan, leftX, localY);
        } else if (!topEdge && !rightEdge && !bottomEdge && !leftEdge) {
          Animated.decay(pan, {
            useNativeDriver: true,
            velocity: {
              x: vx,
              y: vy,
            },
            deceleration: 0.98,
          }).start();
        } else {
          runSpring(pan, 0, 0);
        }
      },
    })
  ).current;

  useEffect(() => {
    if (sizeState.current != size) {
      sizeState.current = size;
    }
  }, [size]);

  useEffect(() => {
    if (
      window.height > 36 &&
      windowState.current != { width: window.width, height: window.height }
    ) {
      windowState.current = { width: window.width, height: window.height };
    }
  }, [window]);

  useEffect(() => {
    pan.x.addListener((value) => (localX = value.value));
    pan.y.addListener((value) => (localY = value.value));

    return () => {
      pan.x.removeAllListeners();
      pan.y.removeAllListeners();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...panResponder.panHandlers}
    >
      <Animated.View
        style={{
          padding: 30,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        onLayout={(event) => setViewSize(event)}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default PanCamera;
