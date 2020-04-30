// CONFIGURATIONS
function prt(text) {
  console.log(text);
}
// END CONFIGURATIONS

class Chapter {
  constructor(name, text) {
    this.name = name;
    this.text = text;
  }

  print() {
    prt(this.name, this.text);
  }
}

export default class Notebook {
  constructor(name) {
    this.name = name;
    this.chapters = [];
  }

  addChapter(name, text) {
    let chapter = new Chapter(name, text);
    this.chapters.push(chapter);
    prt("Chapter added!");
  }

  openChapter(num) {
    if (this.chapters[num - 1]) prt(this.chapters[num - 1].text);
    else prt("Opps! This page number doesn't exist!");
  }

  showIndex() {
    this.chapters.forEach((v, i) => prt(`${i + 1}. ${v.name}: ${v.text}`));
  }

  print() {
    for (let x of this.chapters) {
      x.print();
    }
  }
}
