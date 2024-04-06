import { readdirSync, lstatSync } from "fs";
import { resolve } from "path";

//判断文件是否为文件
const isFile = (path) => {
    return lstatSync(path).isFile();
}

//递归生成一个sidebar
export const createSidebarByDir = async (dirname) => {

    const path = resolve(__dirname, "../../", dirname);
    const _sidebar = [];
    readdirSync(path).forEach(async file => {
        if (!isFile(resolve(path, file))) {
            //是文件夹就递归找到其中的文件
            _sidebar.push({
                text: file,
                children: await createSidebarByDir(dirname + "/" + file),
            });
            console.log(_sidebar);
        } else {
            _sidebar.push(`/${dirname}/${file}`);
        }
    });
    return _sidebar;
}