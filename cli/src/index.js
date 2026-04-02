#!/usr/bin/env node

const blessed = require('blessed');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

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
      '+ AI-driven system optimization',
      '+ Workflow automation & scaling',
      '+ Operational bottleneck resolution',
      '',
      'He also loves traveling, visiting new countries,',
      'and meeting people across the globe.',
      '(if you want to sponsor this, let him know wink)'
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
      '  - Automation & scripting',
      '  - AI/ML projects',
      '  - Building tools',
      '  - Collaboration opportunities',
      '',
      'Drop me a message!'
    ]
  }
};

// Simple ASCII Header
const ASCII_HEADER = `
  D H R U V
   _____ 
  /     \\
 | () () |
  \\_____/
 
  Portfolio
  v1.0.0
`;

const ASCII_SPLASH_COLORS = [
  '#7ce8b2',
  '#8fe3b8',
  '#cfe08f',
  '#f2cf85',
  '#eca18f',
  '#d97cb8',
  '#a588ff',
  '#7db6ff'
];

function hexToRgb(hex) {
  const value = hex.replace('#', '');

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16)
  };
}

function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b]
    .map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0'))
    .join('');
}

function getGradientColor(index, totalLines, palette) {
  if (totalLines <= 1 || palette.length === 1) {
    return palette[0];
  }

  const scaledIndex = (index / (totalLines - 1)) * (palette.length - 1);
  const startIndex = Math.floor(scaledIndex);
  const endIndex = Math.min(startIndex + 1, palette.length - 1);
  const mix = scaledIndex - startIndex;
  const start = hexToRgb(palette[startIndex]);
  const end = hexToRgb(palette[endIndex]);

  return rgbToHex({
    r: start.r + (end.r - start.r) * mix,
    g: start.g + (end.g - start.g) * mix,
    b: start.b + (end.b - start.b) * mix
  });
}

function scaleAsciiLines(lines, xStep = 2, yStep = 2) {
  return lines
    .filter((_, index) => index % yStep === 0)
    .map((line) => Array.from(line).filter((_, index) => index % xStep === 0).join('').trimEnd());
}

function colorizeAsciiLines(lines) {
  return lines
    .map((line, index) => chalk.hex(getGradientColor(index, lines.length, ASCII_SPLASH_COLORS))(line))
    .join('\n');
}

function loadAsciiArt() {
  try {
    const artPath = path.resolve(__dirname, '../ascii-cli.txt');
    const art = fs.readFileSync(artPath, 'utf8').replace(/\n$/, '');
    const lines = art.split('\n');
    const compactLines = scaleAsciiLines(lines, 2, 2);

    return {
      loadingContent: colorizeAsciiLines(compactLines),
      loadingLineCount: compactLines.length,
      mainContent: colorizeAsciiLines(compactLines),
      mainLineCount: compactLines.length
    };
  } catch (error) {
    const fallbackLines = ASCII_HEADER.trim().split('\n');

    return {
      loadingContent: chalk.cyan(ASCII_HEADER),
      loadingLineCount: fallbackLines.length,
      mainContent: chalk.cyan(ASCII_HEADER),
      mainLineCount: fallbackLines.length
    };
  }
}

const ASCII_ART = loadAsciiArt();

// ============== LOADING SCREEN (Simple) ==============
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

    this.loadingBox = blessed.box({
      top: 'center',
      left: 'center',
      width: 36,
      height: 7,
      border: {
        type: 'line'
      },
      style: {
        bg: theme.bg,
        fg: theme.fg,
        border: { fg: theme.border }
      }
    });

    // Loading text
    this.status = blessed.box({
      top: 1,
      left: 0,
      width: '100%-2',
      content: 'Loading...',
      style: { fg: theme.fg, bold: true },
      align: 'center'
    });

    // Simple progress bar
    this.progressBar = blessed.box({
      top: 3,
      left: 0,
      width: '100%-2',
      content: '[                        ] 0%',
      style: { fg: theme.highlight },
      align: 'center'
    });

    this.loadingBox.append(this.status);
    this.loadingBox.append(this.progressBar);
    this.container.append(this.loadingBox);
    this.screen.append(this.container);
    this.screen.render();
  }

  async start() {
    this.createUI();
    
    // Simple progress animation
    for (let i = 0; i <= 100; i += 5) {
      const barLen = Math.floor(i / 4);
      const bar = '#'.repeat(barLen) + '-'.repeat(25 - barLen);
      this.progressBar.setContent('[' + bar + '] ' + i + '%');
      this.status.setContent('Loading... ' + i + '%');
      this.screen.render();
      await this.sleep(40);
    }
    
    this.status.setContent('Ready!');
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
      title: CONFIG.name + "'s Portfolio",
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
      width: '42%',
      height: ASCII_ART.mainLineCount,
      top: 1,
      left: 0,
      content: ASCII_ART.mainContent,
      tags: false
    });

    // Menu
    this.menu = blessed.list({
      width: '42%',
      top: ASCII_ART.mainLineCount + 2,
      bottom: 4,
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
      width: '56%',
      top: 1,
      bottom: 4,
      left: '44%',
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
      bottom: 1,
      content: '  Navigate: up/down  |  Theme: t  |  Quit: q',
      style: { fg: theme.dim }
    });

    // Version
    this.version = blessed.box({
      width: '100%',
      height: 1,
      bottom: 0,
      content: '  v' + CONFIG.version + ' | ' + CONFIG.name + "'s Portfolio",
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
    
    let content = '{bold}{' + theme.highlight + '}' + section.title + '{/' + theme.highlight + '}{/bold}\n';
    content += theme.border + '----------------------------------------\n\n';
    
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
          await this.sleep(8 + Math.random() * 8);
        }
      }
    }
    
    content = '{bold}{' + theme.highlight + '}' + section.title + '{/' + theme.highlight + '}{/bold}\n';
    content += theme.border + '----------------------------------------\n\n';
    section.lines.forEach(line => {
      content += line + '\n';
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
