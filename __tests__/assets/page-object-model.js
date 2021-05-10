class PageObjects {
  async mouseWheel(deltaY) {
    const scrollable = document.getElementsByClassName('scrollable')[0];
    const { height, left, top, width } = scrollable.getBoundingClientRect();

    await webDriver.sendDevToolsCommand('Input.dispatchMouseEvent', {
      deltaX: 0,
      deltaY,
      type: 'mouseWheel',
      x: left + width / 2,
      y: top + height / 2
    });
  }

  paragraphs = [
    'Tempor id consectetur ex non irure aliquip ea irure sint voluptate et. Magna aute reprehenderit amet dolor laboris. Adipisicing aliqua officia tempor magna aliqua commodo proident.',
    'Ad aute esse dolor in veniam reprehenderit labore et. Et dolor sint proident dolor. Aliquip amet duis laboris laboris dolor proident sit adipisicing enim dolore elit dolore.',
    'Consectetur irure qui excepteur voluptate et exercitation. Nostrud sint officia ipsum qui duis do. Amet veniam ipsum tempor anim ad voluptate commodo quis exercitation. Consectetur et laborum Lorem cillum aliquip quis duis est officia culpa consequat nostrud ex. Officia dolore mollit irure aliquip aliquip minim dolor eiusmod et magna.',
    'Proident aliquip culpa aliquip esse cupidatat incididunt voluptate pariatur ullamco ea aute cupidatat. Ex fugiat mollit sunt duis elit aliqua cupidatat officia. Laborum magna dolor non ea aliquip tempor. Sunt voluptate sint minim elit eu eiusmod. Dolor nisi qui enim excepteur ut non elit enim deserunt consectetur in quis. Aute et incididunt sunt est do.',
    'Cillum qui adipisicing culpa laborum eu. Amet qui duis sunt qui magna fugiat culpa. Sit ea amet do sint.',
    'Laboris nulla esse duis fugiat mollit duis consequat incididunt anim eiusmod. Esse labore eiusmod sint culpa Lorem in cupidatat duis. Do et proident irure commodo ut ut reprehenderit ut esse deserunt minim occaecat sunt. Consequat in elit amet labore quis deserunt.',
    'Tempor esse enim cupidatat tempor amet. Sint esse ad consectetur quis minim aliquip. Eiusmod consectetur tempor occaecat deserunt officia enim tempor anim incididunt. Irure duis ad laboris anim. Ullamco reprehenderit voluptate adipisicing excepteur duis id magna quis ex aliqua minim magna minim occaecat.',
    'In consequat ea irure officia enim adipisicing. Laboris excepteur incididunt ad in. Dolor mollit occaecat sunt elit minim commodo est incididunt sit reprehenderit commodo. Sit magna duis minim elit irure velit culpa dolor. Minim culpa nisi et fugiat. In est dolore anim sunt est minim qui sunt mollit commodo id qui non duis. Commodo occaecat occaecat eu cupidatat nostrud nulla ad mollit reprehenderit.',
    'Adipisicing ex sint adipisicing irure ut consectetur nisi consectetur enim qui cillum nostrud. Ullamco adipisicing excepteur proident qui amet eiusmod aute Lorem voluptate eiusmod ullamco. Ex non laborum incididunt nulla ad.'
  ];

  async scrollStabilized() {
    await stabilized('scroll', () => document.getElementsByClassName('scrollable')[0].scrollTop, 5, 5000);
  }

  async scrollStabilizedAt(message, offset) {
    await stabilized(
      message,
      () => {
        const scrollable = document.getElementsByClassName('scrollable')[0];

        return Math.abs(scrollable.scrollTop - offset) <= 1 ? scrollable.scrollTop : {};
      },
      5,
      5000
    );
  }

  async scrollStabilizedAtBottom() {
    const scrollable = document.getElementsByClassName('scrollable')[0];

    await this.scrollStabilizedAt('scroll is at bottom', scrollable.scrollHeight - scrollable.clientHeight);
  }

  async scrollStabilizedAtTop() {
    await this.scrollStabilizedAt('scroll is at top', 0);
  }
}

window.pageObjects || (window.pageObjects = new PageObjects());
