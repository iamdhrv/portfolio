#!/usr/bin/env node

const blessed = require('blessed');
const chalk = require('chalk');

// ============== CONFIG ==============
const CONFIG = {
  name: 'Dhruv',
  version: '1.0.0',
  themes: {
    default: {
      bg: 'black',
      fg: 'white',
      border: 'cyan',
      highlight: 'cyan',
      dim: 'gray'
    },
    matrix: {
      bg: 'black',
      fg: 'green',
      border: 'green',
      highlight: 'green',
      dim: 'darkgreen'
    },
    ocean: {
      bg: 'blue',
      fg: 'white',
      border: 'cyan',
      highlight: 'cyan',
      dim: 'blue'
    }
  }
};

// ============== CONTENT ==============
const CONTENT = {
  about: {
    title: 'About',
    lines: [
      'Dhruv is a technologist & system architect,',
      'currently building cool products and exploring',
      'how to fundamentally optimize any business.',
      '',
      'He integrates AI-driven solutions to automate',
      'workflows, scale systems, and solve modern',
      'business challenges. His core services include:',
      '',
      '✧ AI-driven system optimization',
      '✧ Workflow automation & scaling',
      '✧ Operational bottleneck resolution',
      '',
      'He also loves traveling, visiting new countries,',
      'and meeting people across the globe.',
      '(if you want to sponsor this, let him know 😉)'
    ]
  },
  links: {
    title: 'Links',
    lines: [
      'GitHub:     https://github.com/iamdhrv',
      'LinkedIn:   https://www.linkedin.com/in/dhruv-maniya/',
      'X/Twitter:  https://x.com/iamdhrv',
      'Instagram:  https://www.instagram.com/iamdhrv',
      '',
      'Feel free to connect!'
    ]
  },
  contact: {
    title: 'Contact',
    lines: [
      'Email:    iamdhrv@gmail.com',
      'GitHub:  github.com/iamdhrv',
      '',
      'Always happy to chat about:',
      '  • Automation & scripting',
      '  • AI/ML projects',
      '  • Building tools',
      '  • Collaboration opportunities',
      '',
      'Drop me a message!'
    ]
  }
};

// ASCII Art Header (DHRUV)
const ASCII_HEADER = `
  ██████╗██████╗ ██╗   ██╗██████╗ ████████╗
 ██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝
 ██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║
 ██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║
 ╚██████╗██║  ██║   ██║   ██║        ██║
  ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝
`;

// ============== LOADING SCREEN (Minimal) ==============
class LoadingScreen {
  constructor(screen, callback) {
    this.screen = screen;
    this.callback = callback;
    this.start();
  }

  createUI() {
    const theme = CONFIG.themes.default;

    this.container = blessed.box({
      width: '100%',
      height: '100%',
      style: { bg: theme.bg, fg: theme.fg }
    });

    // Simple loading text
    this.status = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      content: '{cyan}Loading...{white}',
      style: { fg: theme.fg, bold: true },
      align: 'center'
    });

    // Simple progress bar
    this.progressBar = blessed.box({
      top: 'center',
      left: 'center',
      width: 25,
      height: 3,
      style: { fg: theme.highlight }
    });

    this.container.append(this.status);
    this.container.append(this.progressBar);
    this.screen.append(this.container);
    this.screen.render();
  }

  async start() {
    this.createUI();
    
    // Simple progress animation
    const chars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    
    for (let i = 0; i <= 100; i += 5) {
      const char = chars[Math.floor(i / 5) % chars.length];
      const barLen = Math.floor(i / 5);
      const bar = '█'.repeat(barLen) + '░'.repeat(20 - barLen);
      this.progressBar.setContent(`[${bar}] ${i}%`);
      this.status.setContent(`{cyan}Loading ${char}{white} ${i}%`);
      this.screen.render();
      await this.sleep(30);
    }
    
    this.status.setContent('{green}Ready!{white}');
    this.screen.render();
    await this.sleep(200);
    this.callback();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============== MAIN APP ==============
class PortfolioApp {
  constructor() {
    this.screen = null;
    this.currentTheme = 'default';
    this.currentSection = 'about';
    this.sections = ['about', 'links', 'contact'];
    
    this.initLoading();
  }

  initLoading() {
    this.screen = blessed.screen({
      smartCSR: true,
      title: `${CONFIG.name}'s Portfolio`,
      fullUnicode: true
    });

    new LoadingScreen(this.screen, () => {
      this.init();
    });
  }

  init() {
    this.createUI();
    this.setupKeys();
    this.render();
    this.menu.focus();
  }

  createUI() {
    const theme = CONFIG.themes[this.currentTheme];

    this.container = blessed.box({
      width: '100%',
      height: '100%',
      style: { bg: theme.bg, fg: theme.fg }
    });

    // Header
    this.header = blessed.box({
      width: '100%',
      height: 10,
      content: chalk.cyan(ASCII_HEADER),
      style: { fg: theme.highlight, bold: true }
    });

    // Menu
    this.menu = blessed.list({
      width: '25%',
      height: '60%',
      top: 11,
      left: 0,
      keys: true,
      vi: true,
      mouse: true,
      style: {
        selected: { bg: theme.highlight, fg: theme.bg, bold: true },
        item: { fg: theme.fg },
        border: { fg: theme.border }
      },
      items: this.sections.map(s => '  ' + s.charAt(0).toUpperCase() + s.slice(1))
    });

    // Content
    this.content = blessed.box({
      width: '73%',
      height: '60%',
      top: 11,
      left: '26%',
      scrollable: true,
      keys: true,
      vi: true,
      style: {
        border: { fg: theme.border },
        fg: theme.fg
      },
      tags: true
    });

    // Footer
    this.footer = blessed.box({
      width: '100%',
      height: 3,
      top: '72%',
      content: '  Navigate: ↑↓  |  Theme: t  |  Quit: q',
      style: { fg: theme.dim }
    });

    // Version
    this.version = blessed.box({
      width: '100%',
      height: 1,
      top: '99%',
      content: `  v${CONFIG.version} | ${CONFIG.name}'s Portfolio`,
      style: { fg: theme.dim }
    });

    this.container.append(this.header);
    this.container.append(this.menu);
    this.container.append(this.content);
    this.container.append(this.footer);
    this.container.append(this.version);
    this.screen.append(this.container);
  }

  setupKeys() {
    this.menu.on('select', async (item, index) => {
      this.currentSection = this.sections[index];
      await this.renderContent(true);
    });

    this.menu.on('keypress', async (ch, key) => {
      if (key.name === 'up' || key.name === 'k') {
        const idx = this.sections.indexOf(this.currentSection);
        this.currentSection = this.sections[(idx - 1 + this.sections.length) % this.sections.length];
        this.menu.select(this.sections.indexOf(this.currentSection));
        await this.renderContent(true);
      } else if (key.name === 'down' || key.name === 'j') {
        const idx = this.sections.indexOf(this.currentSection);
        this.currentSection = this.sections[(idx + 1) % this.sections.length];
        this.menu.select(this.sections.indexOf(this.currentSection));
        await this.renderContent(true);
      }
    });

    this.screen.key(['t', 'T'], () => {
      this.toggleTheme();
    });

    this.screen.key(['q', 'Q', 'escape'], () => {
      process.exit(0);
    });
  }

  toggleTheme() {
    const themes = Object.keys(CONFIG.themes);
    const currentIdx = themes.indexOf(this.currentTheme);
    this.currentTheme = themes[(currentIdx + 1) % themes.length];
    this.render();
    this.screen.render();
  }

  render() {
    const theme = CONFIG.themes[this.currentTheme];
    
    this.container.style.bg = theme.bg;
    this.container.style.fg = theme.fg;
    this.menu.style.selected.bg = theme.highlight;
    this.menu.style.selected.fg = theme.bg;
    this.menu.style.item.fg = theme.fg;
    this.menu.style.border.fg = theme.border;
    this.content.style.border.fg = theme.border;
    this.content.style.fg = theme.fg;

    this.renderContent(false);
    this.screen.render();
  }

  async renderContent(animate = true) {
    const theme = CONFIG.themes[this.currentTheme];
    const section = CONTENT[this.currentSection];
    
    let content = `{${theme.highlight}}{bold}${section.title}{/bold}{/${theme.highlight}}\n`;
    content += `${theme.border}${'─'.repeat(30)}{\n\n`;
    
    if (animate) {
      this.content.setContent(content);
      this.screen.render();
      await this.sleep(100);
      
      for (const line of section.lines) {
        for (let i = 0; i <= line.length; i++) {
          const typed = line.substring(0, i);
          const lineIdx = section.lines.indexOf(line);
          let newContent = content;
          for (let j = 0; j < lineIdx; j++) {
            newContent += section.lines[j] + '\n';
          }
          newContent += typed + '\n';
          this.content.setContent(newContent);
          this.screen.render();
          await this.sleep(10 + Math.random() * 10);
        }
      }
    }
    
    content = `{${theme.highlight}}{bold}${section.title}{/bold}{/${theme.highlight}}\n`;
    content += `${theme.border}${'─'.repeat(30)}{\n\n`;
    section.lines.forEach(line => {
      content += `${line}\n`;
    });
    this.content.setContent(content);
    this.screen.render();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============== START ==============
const app = new PortfolioApp();
