// CONFIGURATIONS
function prt(text) {
    console.log(text);
}
// END CONFIGURATIONS

class Page {
    constructor(text) {
        this.text = text;
    }

    print() {
        prt(this.text);
    }
}

export default class Notebook {
    constructor(name) {
        this.name = name;
        this.pages = [];
    }

    addPage(text) {
        let page = new Page(text);
        this.pages.push(page);
        prt('Page added!');
    }

    openPage(num) {
        if (this.pages[num - 1]) prt(this.pages[num - 1].text);
        else prt('Opps! This page number doesn\'t exist!')
    }

    showIndex() {
        this.pages.forEach((v, i) => prt(`${i + 1}: ${v.text}`));
    }

    print() {
        for (let x of this.pages) {
            x.print();
        }
    }
}