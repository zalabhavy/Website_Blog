class AutoTyping {
    constructor(
      e,
      t,
      {
        typeSpeed: r = 150,
        deleteSpeed: n = 150,
        waitBeforeDelete: i = 1000,
        waitBetweenWords: o = 1000,
        writeWhole: l = false,
      } = {}
    ) {
      this.selector = e;
      this.text = t;
      this.typeSpeed = r;
      this.deleteSpeed = n;
      this.waitBeforeDelete = i;
      this.waitBetweenWords = o;
      this.writeWhole = l;
      this.el = document.querySelector(e);
    }
  
    async start() {
      this.el;
      for (let e = 0; e < this.text.length; e++) {
        const t = this.text[e];
        let r = t.split("");
        this.writeWhole && (r = [t]);
        await this.writeText(r);
        e == this.text.length - 1 && (e = -1);
      }
    }
  
    writeText(e) {
      let t = this;
      return new Promise((r) => {
        const n = this.el;
        let i = false,
          o = setInterval(() => {
            let l = e.shift();
            i && ((i = false), (l = " " + l)),
              (i = " " == l),
              (n.innerText += l),
              0 == e.length &&
                (clearInterval(o),
                setTimeout(() => {
                  let e = setInterval(() => {
                    const i = n.innerText;
                    t.writeWhole
                      ? (n.innerText = "")
                      : (n.innerText = i.substr(0, i.length - 1)),
                      0 == n.innerText.length &&
                        (clearInterval(e),
                        setTimeout(() => r(), this.waitBetweenWords));
                  }, this.deleteSpeed);
                }, this.waitBeforeDelete));
          }, this.typeSpeed);
      });
    }
  }
  
  