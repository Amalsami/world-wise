import React from "react";
import styles from "./Sidebar.module.css";
// import PageNav from './PageNav'
import Logo from "./Logo";
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";

export const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
    </div>
  );
};
