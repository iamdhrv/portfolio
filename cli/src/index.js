#!/usr/bin/env node

const blessed = require('blessed');
const chalk = require('chalk');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// ============== CONFIG ==============
const CONFIG = {
  name: 'Dhruv',
  version: '1.0.0',
  themes: {
    default: {
      bg: 'default',
      fg: 'white',
      tagFg: 'white',
      border: '#64d9f5',
      highlight: '#64d9f5',
      tagHighlight: 'cyan',
      dim: 'gray',
      tagDim: 'gray'
    },
    matrix: {
      bg: '#020503',
      fg: '#9af8c1',
      tagFg: 'green',
      border: '#67f08c',
      highlight: '#67f08c',
      tagHighlight: 'green',
      dim: 'gray',
      tagDim: 'gray'
    },
    ocean: {
      bg: '#0e3a63',
      fg: '#eef6ff',
      tagFg: 'white',
      border: '#6de2ff',
      highlight: '#6de2ff',
      tagHighlight: 'cyan',
      dim: 'gray',
      tagDim: 'gray'
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
      '(if you want to sponsor this, let him know 😉)'
    ]
  },
  links: {
    title: 'Links',
    lines: [
      'Pick a profile below to open it in your browser or copy it.',
      '',
      'Use Enter to open and c to copy the selected item.'
    ],
    actions: [
      { label: 'GitHub', value: 'https://github.com/iamdhrv', type: 'url' },
      { label: 'LinkedIn', value: 'https://www.linkedin.com/in/dhruv-maniya/', type: 'url' },
      { label: 'X / Twitter', value: 'https://x.com/iamdhrv', type: 'url' },
      { label: 'Instagram', value: 'https://www.instagram.com/iamdhrv', type: 'url' }
    ]
  },
  contact: {
    title: 'Contact',
    lines: [
      'Always happy to chat about:',
      '  - Automation & scripting',
      '  - AI/ML projects',
      '  - Building tools',
      '  - Collaboration opportunities',
      '',
      'Use Enter to draft an email or c to copy the address.'
    ],
    actions: [
      { label: 'Email', value: 'iamdhrv@gmail.com', type: 'email' }
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

function runCommand(command, args = [], input) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['pipe', 'ignore', 'ignore'] });

    child.on('error', reject);

    if (typeof input === 'string') {
      child.stdin.end(input);
    } else {
      child.stdin.end();
    }

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(command + ' exited with code ' + code));
      }
    });
  });
}

async function openExternal(target) {
  const commands = process.platform === 'darwin'
    ? [['open', [target]]]
    : process.platform === 'win32'
      ? [['cmd', ['/c', 'start', '', target]]]
      : [['xdg-open', [target]]];

  for (const [command, args] of commands) {
    try {
      await runCommand(command, args);
      return;
    } catch (error) {
      continue;
    }
  }

  throw new Error('Unable to open external target');
}

async function copyToClipboard(value) {
  const commands = process.platform === 'darwin'
    ? [['pbcopy', []]]
    : process.platform === 'win32'
      ? [['clip', []]]
      : [
          ['wl-copy', []],
          ['xclip', ['-selection', 'clipboard']],
          ['xsel', ['--clipboard', '--input']]
        ];

  for (const [command, args] of commands) {
    try {
      await runCommand(command, args, value);
      return;
    } catch (error) {
      continue;
    }
  }

  throw new Error('Unable to copy to clipboard');
}

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
      width: 42,
      height: 5,
      style: {
        bg: theme.bg,
        fg: theme.fg
      }
    });

    this.status = blessed.box({
      top: 0,
      left: 0,
      width: '100%',
      content: 'Loading...',
      style: { fg: theme.fg, bold: true },
      align: 'center'
    });

    this.progressBar = blessed.box({
      top: 2,
      left: 0,
      width: '100%',
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
    this.sectionIndex = 0;
    this.sectionActionIndex = {
      links: 0,
      contact: 0
    };
    this.statusMessage = '';
    this.statusTimeout = null;
    
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
  }

  createUI() {
    const theme = CONFIG.themes[this.currentTheme];
    const isCompact = this.screen.width < 78 || this.screen.height < 24;
    const leftWidth = isCompact ? '100%-4' : '48%';
    const rightWidth = isCompact ? '100%-4' : '46%';
    const rightLeft = isCompact ? 2 : '52%';
    const artHeight = isCompact
      ? Math.min(ASCII_ART.mainLineCount, Math.max(this.screen.height - 12, 10))
      : Math.min(ASCII_ART.mainLineCount, Math.max(this.screen.height - 8, 16));

    this.container = blessed.box({
      width: '100%',
      height: '100%',
      style: { bg: theme.bg, fg: theme.fg }
    });

    this.header = blessed.box({
      width: leftWidth,
      height: artHeight,
      top: 1,
      left: 2,
      content: ASCII_ART.mainContent,
      tags: false,
      style: {
        bg: theme.bg,
        fg: theme.fg
      }
    });

    this.title = blessed.box({
      width: rightWidth,
      height: 3,
      top: isCompact ? artHeight + 2 : 2,
      left: rightLeft,
      align: 'left',
      tags: true,
      style: {
        bg: theme.bg,
        fg: theme.fg
      }
    });

    this.content = blessed.box({
      width: rightWidth,
      top: isCompact ? artHeight + 6 : 6,
      bottom: 5,
      left: rightLeft,
      scrollable: true,
      keys: true,
      vi: true,
      mouse: true,
      alwaysScroll: true,
      wrap: true,
      style: {
        bg: theme.bg,
        fg: theme.fg
      },
      tags: true,
      padding: {
        left: 0,
        right: 1
      }
    });
    this.contentBaseTop = isCompact ? artHeight + 6 : 6;

    this.actionList = blessed.list({
      width: rightWidth,
      height: 6,
      bottom: 5,
      left: rightLeft,
      keys: false,
      mouse: true,
      tags: true,
      hidden: true,
      style: {
        bg: theme.bg,
        fg: theme.fg,
        selected: {
          bg: theme.highlight,
          fg: 'black',
          bold: true
        },
        item: {
          bg: theme.bg,
          fg: theme.fg
        }
      },
      padding: {
        left: 0,
        right: 1
      }
    });

    this.nav = blessed.box({
      width: rightWidth,
      height: 1,
      bottom: 3,
      left: rightLeft,
      tags: true,
      style: {
        bg: theme.bg,
        fg: theme.fg
      }
    });

    this.footer = blessed.box({
      width: '100%-4',
      height: 1,
      bottom: 1,
      left: 2,
      align: 'center',
      tags: true,
      style: {
        bg: theme.bg,
        fg: theme.dim
      }
    });

    this.version = blessed.box({
      width: '100%-4',
      height: 1,
      bottom: 0,
      left: 2,
      align: 'right',
      style: {
        bg: theme.bg,
        fg: theme.dim
      }
    });

    this.container.append(this.header);
    this.container.append(this.title);
    this.container.append(this.content);
    this.container.append(this.actionList);
    this.container.append(this.nav);
    this.container.append(this.footer);
    this.container.append(this.version);
    this.screen.append(this.container);
  }

  setupKeys() {
    this.screen.key(['left', 'h'], () => {
      this.moveSection(-1);
    });

    this.screen.key(['right', 'l'], () => {
      this.moveSection(1);
    });

    this.screen.key(['up', 'k'], () => {
      if (this.hasActions()) {
        this.moveAction(-1);
        return;
      }

      this.moveSection(-1);
    });

    this.screen.key(['down', 'j'], () => {
      if (this.hasActions()) {
        this.moveAction(1);
        return;
      }

      this.moveSection(1);
    });

    this.screen.key(['enter'], () => {
      if (this.hasActions()) {
        this.openCurrentAction();
      }
    });

    this.screen.key(['c', 'C', 'y'], () => {
      if (this.hasActions()) {
        this.copyCurrentAction();
      }
    });

    this.screen.key(['t', 'T'], () => {
      this.toggleTheme();
    });

    this.screen.on('keypress', (ch) => {
      if (ch === '1') {
        this.selectSection(0);
      } else if (ch === '2') {
        this.selectSection(1);
      } else if (ch === '3') {
        this.selectSection(2);
      }
    });

    this.screen.key(['q', 'Q', 'escape'], () => {
      process.exit(0);
    });

    this.screen.on('resize', () => {
      this.screen.remove(this.container);
      this.createUI();
      this.render();
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
    this.header.style.bg = theme.bg;
    this.title.style.bg = theme.bg;
    this.title.style.fg = theme.highlight;
    this.content.style.bg = theme.bg;
    this.content.style.fg = theme.fg;
    this.actionList.style.bg = theme.bg;
    this.actionList.style.fg = theme.fg;
    this.actionList.style.item.bg = theme.bg;
    this.actionList.style.item.fg = theme.fg;
    this.actionList.style.selected.bg = theme.highlight;
    this.actionList.style.selected.fg = 'black';
    this.nav.style.bg = theme.bg;
    this.footer.style.bg = theme.bg;
    this.footer.style.fg = theme.dim;
    this.version.style.bg = theme.bg;
    this.version.style.fg = theme.dim;
    this.title.setContent(this.getTitleContent(theme));
    this.nav.setContent(this.getNavContent(theme));
    this.footer.setContent(this.getFooterContent(theme));
    this.version.setContent(CONFIG.name + "'s Portfolio  ·  v" + CONFIG.version);

    this.renderContent();
    this.screen.render();
  }

  getTitleContent(theme) {
    return '{' + theme.tagHighlight + '-fg}dhruv{/' + theme.tagHighlight + '-fg}\n'
      + '{' + theme.tagDim + '-fg}system architect • automation engineer{/' + theme.tagDim + '-fg}';
  }

  getNavContent(theme) {
    return this.sections
      .map((section, index) => {
        const label = section.charAt(0).toUpperCase() + section.slice(1);
        if (index === this.sectionIndex) {
          return '{' + theme.tagHighlight + '-fg}✦ ' + label + '{/' + theme.tagHighlight + '-fg}';
        }

        return '{' + theme.tagFg + '-fg}' + label + '{/' + theme.tagFg + '-fg}';
      })
      .join('    ');
  }

  getFooterContent(theme) {
    if (this.statusMessage) {
      return '{' + theme.tagHighlight + '-fg}' + this.statusMessage + '{/' + theme.tagHighlight + '-fg}';
    }

    if (this.hasActions()) {
      return '↑/↓ choose  ·  Enter open  ·  c copy  ·  ←/→ sections  ·  t theme';
    }

    return '←/→ sections  ·  1-3 jump  ·  t theme  ·  q quit';
  }

  formatSectionLines(section, theme) {
    return section.lines.map((line) => {
      if (!line.trim()) {
        return '';
      }

      if (line.startsWith('+ ')) {
        return '{' + theme.tagHighlight + '-fg}•{/' + theme.tagHighlight + '-fg} ' + line.slice(2);
      }

      if (line.startsWith('  - ')) {
        return '{' + theme.tagHighlight + '-fg}•{/' + theme.tagHighlight + '-fg} ' + line.trim().slice(2);
      }

      if (line.includes(':') && this.currentSection !== 'about') {
        const [label, ...rest] = line.split(':');
        return '{' + theme.tagHighlight + '-fg}' + label + ':{/' + theme.tagHighlight + '-fg}' + rest.join(':');
      }

      if (line.startsWith('(') && line.endsWith(')')) {
        return '{' + theme.tagDim + '-fg}' + line + '{/' + theme.tagDim + '-fg}';
      }

      return line;
    });
  }

  renderContent() {
    const theme = CONFIG.themes[this.currentTheme];
    const section = CONTENT[this.currentSection];
    const lines = this.formatSectionLines(section, theme);
    const actions = this.getCurrentActions();
    let content = '{bold}{' + theme.tagHighlight + '-fg}' + section.title + '{/' + theme.tagHighlight + '-fg}{/bold}\n';
    content += '{' + theme.tagDim + '-fg}────────────────────────────────{/' + theme.tagDim + '-fg}\n\n';
    content += lines.join('\n');
    this.content.top = this.contentBaseTop;
    this.content.bottom = actions.length > 0 ? Math.min(actions.length + 1, 8) + 6 : 5;
    this.content.setScroll(0);
    this.content.setContent(content);

    if (actions.length > 0) {
      this.actionList.height = Math.min(actions.length + 1, 8);
      this.actionList.bottom = 5;
      this.actionList.show();
      this.actionList.setItems(actions.map((action) => this.formatActionItem(action, theme)));
      this.actionList.select(this.sectionActionIndex[this.currentSection] || 0);

      this.actionList.children.forEach((child, index) => {
        child.on('click', () => {
          this.sectionActionIndex[this.currentSection] = index;
          this.actionList.select(index);
          this.openCurrentAction();
        });
      });
    } else {
      this.actionList.hide();
    }
  }

  formatActionItem(action, theme) {
    return '{' + theme.tagHighlight + '-fg}' + action.label + '{/' + theme.tagHighlight + '-fg}'
      + '  '
      + '{' + theme.tagDim + '-fg}' + action.value + '{/' + theme.tagDim + '-fg}';
  }

  getCurrentActions() {
    return CONTENT[this.currentSection].actions || [];
  }

  hasActions() {
    return this.getCurrentActions().length > 0;
  }

  moveAction(direction) {
    const actions = this.getCurrentActions();
    if (actions.length === 0) {
      return;
    }

    const currentIndex = this.sectionActionIndex[this.currentSection] || 0;
    const nextIndex = (currentIndex + direction + actions.length) % actions.length;
    this.sectionActionIndex[this.currentSection] = nextIndex;
    this.actionList.select(nextIndex);
    this.screen.render();
  }

  getSelectedAction() {
    const actions = this.getCurrentActions();
    if (actions.length === 0) {
      return null;
    }

    const index = this.sectionActionIndex[this.currentSection] || 0;
    return actions[index] || null;
  }

  async openCurrentAction() {
    const action = this.getSelectedAction();
    if (!action) {
      return;
    }

    const target = action.type === 'email' ? 'mailto:' + action.value : action.value;
    try {
      await openExternal(target);
      this.flashStatus('Opened ' + action.label);
    } catch (error) {
      this.flashStatus('Could not open ' + action.label);
    }
  }

  async copyCurrentAction() {
    const action = this.getSelectedAction();
    if (!action) {
      return;
    }

    try {
      await copyToClipboard(action.value);
      this.flashStatus('Copied ' + action.label);
    } catch (error) {
      this.flashStatus('Could not copy ' + action.label);
    }
  }

  flashStatus(message) {
    this.statusMessage = message;
    if (this.statusTimeout) {
      clearTimeout(this.statusTimeout);
    }

    this.render();

    this.statusTimeout = setTimeout(() => {
      this.statusMessage = '';
      this.statusTimeout = null;
      this.render();
    }, 1800);
  }

  moveSection(direction) {
    const nextIndex = (this.sectionIndex + direction + this.sections.length) % this.sections.length;
    this.selectSection(nextIndex);
  }

  selectSection(index) {
    this.sectionIndex = index;
    this.currentSection = this.sections[index];
    this.render();
  }
}

// ============== START ==============
const app = new PortfolioApp();
