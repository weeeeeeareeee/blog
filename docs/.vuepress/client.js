import { defineClientConfig } from 'vuepress/client'
import Element from "element-plus";
import "element-plus/dist/index.css";
import "./public/style/index.css";

//获取所有案例代码
const componentFile = import.meta.glob(
    "./examples/**/*.vue",
    { eager: true }
);
const componentList = {};
//处理所有案例代码方便引用
Object.keys(componentFile).forEach((item) => {
    componentList[item.replace("./examples/", "").replace(".vue", "")] =
        componentFile[item].default;
});

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.use(Element);
        app.provide("demos", componentList);
    },
    setup() { },
    rootComponents: [],
})