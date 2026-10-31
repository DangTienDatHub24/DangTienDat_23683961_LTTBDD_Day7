import React from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBar, type TabItem } from "../components/TabBar";
import { useCart } from "../store/hooks";

const EMOJI: Record<string, string> = {
  Home: "🏠",
  Categories: "🗂️",
  Cart: "🛒",
  Account: "👤",
};

// Nối Tab Bar tự dựng với React Navigation: nhận { state, descriptors, navigation }
export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { totalQuantity } = useCart();
  const items: TabItem[] = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key].options.title ?? route.name,
    emoji: EMOJI[route.name],
    badge: route.name === "Cart" ? totalQuantity : undefined,
  }));

  const onPress = (key: string) => {
    const route = state.routes.find((item) => item.key === key);
    if (!route) return;

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (route.key !== state.routes[state.index].key && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  return <TabBar items={items} activeKey={state.routes[state.index].key} onPress={onPress} />;
}
