import { readdirSync, lstatSync, existsSync } from "fs";
import { resolve } from "path";
import prism from "prismjs";
//判断文件是否为文件
const isFile = (path) => {
    return lstatSync(path).isFile();
}

//递归生成一个sidebar
export const createSidebarByDir = async (dirname) => {

    const path = resolve(__dirname, "../../", dirname);
    if (!existsSync(path)) {
        return [];
    }
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

export const highlight = (content) => {
    return prism.highlight(content, prism.languages.markup, "markup", 1);
};
