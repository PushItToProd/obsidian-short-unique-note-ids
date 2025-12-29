import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface ShortNoteIdsPluginSettings {
  epochYear: number;
  newFileLocation: string;
}

const DEFAULT_SETTINGS: ShortNoteIdsPluginSettings = {
  epochYear: -1,
  newFileLocation: '',
};

export default class ShortNoteIdsPlugin extends Plugin {
  settings: ShortNoteIdsPluginSettings;

  async onload() {
    await this.loadSettings();

    // Configure the settings tab
    this.addSettingTab(new ShortNoteIdsSettingTab(this.app, this));


    // This adds a simple command that can be triggered anywhere
    // this.addCommand({
    //  id: 'open-sample-modal-simple',
    //  name: 'Open sample modal (simple)',
    //  callback: () => {
    //    new SampleModal(this.app).open();
    //  }
    // });
  }

  onunload() {

  }

  generateInitialSettings(): ShortNoteIdsPluginSettings {
    return {
      ...DEFAULT_SETTINGS,
      epochYear: new Date().getFullYear(),
    };
  }

  async loadSettings() {
    // Set epoch year on initial load
    const savedSettings = await this.loadData();
    console.log('short note IDs - loaded settings:', savedSettings);
    const firstLoad = savedSettings == null;

    this.settings = Object.assign({}, DEFAULT_SETTINGS, savedSettings);
    if (firstLoad) {
      console.log('first load - persisting essential settings')
      this.saveSettings();
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class ShortNoteIdsSettingTab extends PluginSettingTab {
  plugin: ShortNoteIdsPlugin;

  constructor(app: App, plugin: ShortNoteIdsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const {containerEl} = this;

    containerEl.empty();

    // New file location
    new Setting(containerEl)
      .setName('New file location')
      .setDesc('The folder path where new unique notes should be created.')
      .addText(text => text
        .setPlaceholder('Example: folder 1/folder')
        .setValue(this.plugin.settings.newFileLocation)
        .onChange(async (value) => {
          this.plugin.settings.newFileLocation = value;
          await this.plugin.saveSettings();
        }));

    // TODO: New file template

    new Setting(containerEl)
      .setName('Epoch year')
      .setDesc('The year ')
  }
}
