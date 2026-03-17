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
      '(if you want to sponsor this, let him know 😉)',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '"Code is poetry written for machines."'
    ]
  },
  links: {
    title: 'Links',
    lines: [
      '',
      '{cyan}GitHub:{white}     https://github.com/iamdhrv',
      '',
      '{cyan}LinkedIn:{white}   https://www.linkedin.com/in/dhruv-maniya/',
      '',
      '{cyan}X/Twitter:{white}  https://x.com/iamdhrv',
      '',
      '{cyan}Instagram:{white}  https://www.instagram.com/iamdhrv',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      'Feel free to connect!'
    ]
  },
  contact: {
    title: 'Contact',
    lines: [
      '',
      'Email:    {cyan}iamdhrv@gmail.com{white}',
      '',
      'GitHub:  {cyan}github.com/iamdhrv{white}',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      'Always happy to chat about:',
      '  • Automation & scripting',
      '  • AI/ML projects',
      '  • Building tools',
      '  • Collaboration opportunities',
      '',
      'Drop me a message! 📬'
    ]
  }
};

// ASCII Art Header
const ASCII_HEADER = `
●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●•••∙∙∙····       ··∙∙•••●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●•••                      ·∙•••●●●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●•••·         ∙∙·           ∙••●●●●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●••••●●●•••∙··   ··   ··  ····∙••●●●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●•••●•••••••••••••∙ ·∙·∙•••••••••●●●•●●●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●•●●●●•••●●●••••∙∙∙∙············∙∙∙∙•••••••●●•••●●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●••••••●••••∙∙·····         ·····       ·∙∙∙•••●●•••●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●•••••••∙······∙            ·∙·          ····∙•••••••●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●•••••∙··········         ·∙  ·            ······∙•••●••●●●●●●●●●●●●●●●●
●●●●●●●●●●●●••••••●••∙··········∙         ••·•  ∙·•∙         ∙······∙•••••●●●●●●●●●●●●●●●●
●●●●●●●●●●●●•••••••∙········     ·        ·∙∙ · ∙∙•·         ∙········∙•••••●●●●●●●●●●●●●●
●●●●●●●●●•••••∙···∙∙·                    ···            · ··········••••●●●●●●●●●●●●●●
●●●●●●●●●●•••●•∙····                    ∙∙  ·∙∙·                 ······∙••●●●●●●●●●●●●●●
●●●●●●●●●●••••∙····                    ∙∙∙   ∙∙∙∙                  ∙····∙•●●●●●●●●●●●●●●
●●●●●●•••••●•••∙∙                        ∙∙∙∙∙∙∙∙∙∙                   ·····•●••●●●●●●●●●●●
●●●•••●●●●●••••∙                          ·∙∙∙∙∙∙·                     ∙···∙••••••●●●●●●●●
•••●●●•••••●●●∙∙                             ·                           ···••••••●●●●●●●●
•●●•∙       ··∙··                            ·                            ·∙•●••••●●●●●●●●
••·           ···∙                                                         ∙•••••••••●●●●●
•             ····                          ··                             ∙•●●●●●●•••••●●
∙            ·····    ·•∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙···                   ··•••∙∙∙∙••●●●•●
∙            ·∙···     ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙···        ∙··∙          ∙•●•
●·              ·∙      ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙•     ∙·∙             ∙•
••∙            ·∙··      ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙·    ∙···              •
••●•∙·       ····∙∙·      ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙     ····               ∙
●••●●●••∙··········∙·      ∙∙∙∙∙∙····∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙     ···∙                ∙
•●●•••••••∙·········∙·      ·•∙··········∙∙∙∙∙∙········∙∙∙∙∙∙      ···∙··              ·•
●●●●●●••••••∙········∙∙       ·∙·························∙∙∙·      ········           ·••●
●●●●●●••••••••∙·······∙•·       ························∙∙       ·∙············· ···∙•●●●•
●●●●●●•●•••••••••∙······∙∙·        ····················        ·∙∙··········∙∙••●●●●●●••●●
●●●●●●●●●●●●●••●●••∙∙·····∙∙∙·           ········            ·∙•∙········∙••••●●••••••●●●●
●●●●●●●●●●●●••••●••·······∙∙•∙∙∙∙·                     ·∙∙∙∙∙·······∙•••●●••••●●●●●●●●●●
●●●●●●●●●●•••●●••••········     ··∙∙∙··   ·∙∙∙∙∙∙∙∙∙•∙∙∙∙······∙∙∙••●●••••●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●•●•∙·····         ·         ··       ·········∙••●●•••●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●•●•∙····         ······  ·   ·         ······∙••••••●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●••••··∙  ·       ·    ···    ·          ····∙•••••••●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●••••∙···          ·    ∙·    ·          ····•●••●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●•••••···               ·             ·  ···•●•●•●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●•••••∙····                             ···•••●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●•••••∙·····                         ····•●••●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●••••∙ ···········               ······∙••••••●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●••••    ··········∙∙∙∙∙···············∙•••●•●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●•●•                 · ··············  ••●●●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●•●•                 ·                 ●•●●●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●•●•·               ··                ·●•●●●●●●●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●●••·                                ••••●•●●●●●●●●●●●●●●
●●●●●●●●●●●●●●●●●•●●•∙·       ·∙∙·  ··            ∙•●•●●••●●●●●●●●●●●●
●●●●●●●●●●●●●●●●•••●●●●•••••●●●●●●••••∙··    ··••●••●●●••●●●●●●●●●●●●●●●●●●●●●●●●●●
`;

// ============== LOADING SCREEN (Simplified) ==============
class LoadingScreen {
  constructor(screen, callback) {
    this.screen = screen;
    this.callback = callback;
    this.bars = [
      { name: 'Loading', speed: 25 },
      { name: 'Starting', speed: 30 },
      { name: 'Ready', speed: 20 }
    ];
    this.start();
  }

  createUI() {
    const theme = CONFIG.themes.default;

    // Main container
    this.container = blessed.box({
      width: '100%',
      height: '100%',
      style: { bg: theme.bg, fg: theme.fg }
    });

    // Progress container (centered)
    this.progressContainer = blessed.box({
      top: '45%',
      left: 'center',
      width: '50%',
      height: 8
    });

    // Status text
    this.status = blessed.box({
      top: '55%',
      left: 'center',
      width: '50%',
      content: '{cyan}Loading...{white}',
      style: { fg: theme.fg }
    });

    this.container.append(this.progressContainer);
    this.container.append(this.status);
    this.screen.append(this.container);
    this.screen.render();
  }

  async start() {
    this.createUI();
    
    for (let i = 0; i < this.bars.length; i++) {
      await this.animateBar(this.bars[i]);
    }
    
    // Small delay before showing main app
    await this.sleep(200);
    this.callback();
  }

  async animateBar(bar) {
    const width = 30;
    const filled = '█';
    const empty = '░';
    const theme = CONFIG.themes.default;
    
    let progress = 0;
    while (progress <= width) {
      const filledStr = filled.repeat(progress);
      const emptyStr = empty.repeat(width - progress);
      const percent = Math.round((progress / width) * 100);
      
      const barStr = `[${theme.highlight}${filledStr}${theme.dim}${emptyStr}{white}] ${percent}%`;
      this.progressContainer.setContent(barStr);
      this.screen.render();
      
      await this.sleep(bar.speed);
      progress++;
    }
    
    // Update status
    this.status.setContent(`{cyan}${bar.name}... {green}✓{white}`);
    this.screen.render();
    await this.sleep(80);
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
    
    // Start with loading screen
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
    // Create main container
    this.createUI();
    
    // Handle keys
    this.setupKeys();
    
    // Initial render
    this.render();
    
    // Focus on menu
    this.menu.focus();
  }

  createUI() {
    const theme = CONFIG.themes[this.currentTheme];
    const width = '100%';
    const height = '100%';

    // Main container
    this.container = blessed.box({
      width,
      height,
      style: {
        bg: theme.bg,
        fg: theme.fg
      }
    });

    // Header (ASCII Art)
    this.header = blessed.box({
      width: '100%',
      height: 35,
      content: chalk.cyan(ASCII_HEADER),
      style: {
        fg: theme.highlight
      }
    });

    // Menu (left side)
    this.menu = blessed.list({
      width: '20%',
      height: '45%',
      top: 36,
      left: 0,
      keys: true,
      vi: true,
      mouse: true,
      style: {
        selected: {
          bg: theme.highlight,
          fg: theme.bg
        },
        item: {
          fg: theme.fg
        },
        border: {
          fg: theme.border
        }
      },
      items: this.sections.map(s => chalk[theme.highlight]('▸ ') + s.charAt(0).toUpperCase() + s.slice(1))
    });

    // Content panel (right side)
    this.content = blessed.box({
      width: '78%',
      height: '45%',
      top: 36,
      left: '22%',
      scrollable: true,
      keys: true,
      vi: true,
      style: {
        border: {
          fg: theme.border
        },
        fg: theme.fg
      },
      tags: true
    });

    // Footer
    this.footer = blessed.box({
      width: '100%',
      height: 3,
      top: '82%',
      content: `{${theme.dim}} Navigate: ↑↓ arrows | Theme: t | Quit: q {${
        theme.fg}}`,
      style: {
        fg: theme.dim
      }
    });

    // Version info
    this.version = blessed.box({
      width: '100%',
      height: 1,
      top: '99%',
      left: 0,
      content: `{${theme.dim}} v${CONFIG.version} | Built with blessed | ${CONFIG.name}'s Portfolio`,
      style: {
        fg: theme.dim
      }
    });

    // Append all to container
    this.container.append(this.header);
    this.container.append(this.menu);
    this.container.append(this.content);
    this.container.append(this.footer);
    this.container.append(this.version);

    // Add to screen
    this.screen.append(this.container);
  }

  setupKeys() {
    // Menu navigation
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

    // Global keys
    this.screen.key(['t', 'T'], () => {
      this.toggleTheme();
    });

    this.screen.key(['q', 'Q', 'escape'], () => {
      process.exit(0);
    });

    this.screen.key(['r', 'R'], () => {
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
    
    // Update styles based to theme
    this.container.style.bg = theme.bg;
    this.container.style.fg = theme.fg;
    this.menu.style.selected.bg = theme.highlight;
    this.menu.style.selected.fg = theme.bg;
    this.menu.style.item.fg = theme.fg;
    this.menu.style.border.fg = theme.border;
    this.content.style.border.fg = theme.border;
    this.content.style.fg = theme.fg;

    // Render content (no animation on theme switch)
    this.renderContent(false);
    
    this.screen.render();
  }

  async renderContent(animate = true) {
    const theme = CONFIG.themes[this.currentTheme];
    const section = CONTENT[this.currentSection];
    
    let content = `{${theme.highlight}}${section.title}{${
      theme.fg}}\n`;
    content += `${theme.border}${'═'.repeat(40)}{${theme.fg}}\n\n`;
    
    if (animate) {
      // Show header immediately
      this.content.setContent(content);
      this.screen.render();
      await this.sleep(150);
      
      // Type out each line
      for (const line of section.lines) {
        for (let i = 0; i <= line.length; i++) {
          const typedLine = line.substring(0, i);
          let newContent = content;
          const lineIndex = section.lines.indexOf(line);
          for (let j = 0; j < lineIndex; j++) {
            newContent += section.lines[j] + '\n';
          }
          newContent += typedLine + '\n';
          
          this.content.setContent(newContent + '{blink}__{/blink}');
          this.screen.render();
          await this.sleep(15 + Math.random() * 10);
        }
      }
      
      // Final content without cursor
      section.lines.forEach(line => {
        content += `${line}\n`;
      });
      this.content.setContent(content);
      this.screen.render();
    } else {
      section.lines.forEach(line => {
        content += `${line}\n`;
      });
      this.content.setContent(content);
      this.screen.render();
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============== START ==============
const app = new PortfolioApp();
