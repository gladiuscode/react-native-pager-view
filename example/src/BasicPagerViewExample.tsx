import React, {useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  Text,
  FlatList,
  useWindowDimensions,
  ListRenderItem,
} from 'react-native';

import PagerView from 'react-native-pager-view';

import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';

const MESSAGES = [
  'okay',
  'sudo make me a sandwich',
  'what? make it yourself',
  'make me a sandwich',
];

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export function BasicPagerViewExample() {
  const { ref, ...navigationPanel } = useNavigationPanel();
  const { width } = useWindowDimensions();

  const renderItem = useCallback<ListRenderItem<typeof MESSAGES[number]>>(({ item }) => {
    return (
      <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
        <View accessible style={{ width: '60%', paddingVertical: 100, borderWidth: 1 }}>
          <Text accessible={false}>{item}</Text>
        </View>
      </View>
    );
  }, [width]);

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedPagerView
        {...navigationPanel}
        testID="pager-view"
        ref={ref}
        style={styles.PagerView}
        initialPage={0}
        pageMargin={10}
        scrollEnabled={false}
      >
        {useMemo(
          () =>
            navigationPanel.pages.map((page) => (
              <View
                testID="pager-view-content"
                key={page.key}
                style={page.style}
                collapsable={false}
              >
                <FlatList style={{ width }} data={MESSAGES} horizontal renderItem={renderItem} />
              </View>
            )),
          [navigationPanel.pages, renderItem, width]
        )}
      </AnimatedPagerView>
      <NavigationPanel {...navigationPanel} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  PagerView: {
    flex: 1,
  },
});
