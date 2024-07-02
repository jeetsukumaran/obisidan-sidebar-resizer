import { PluginSettingTab, App, Setting } from 'obsidian';
import SidebarWidthPlugin from './main';

export interface SidebarWidthPluginSettings {
    increment: string; // e.g., "50px" or "10%"
    leftSidebarStandardWidth: string; // e.g., "100px" or "20%"
    rightSidebarStandardWidth: string; // e.g., "100px" or "20%"
    // sidebarUnit: string; // "px" or "%"
}

export const DEFAULT_SETTINGS: SidebarWidthPluginSettings = {
    increment: "10%",
    leftSidebarStandardWidth: "20%",
    rightSidebarStandardWidth: "20%",
    // sidebarUnit: "px"
}

export class SidebarWidthSettingTab extends PluginSettingTab {
    plugin: SidebarWidthPlugin;

    constructor(app: App, plugin: SidebarWidthPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.createEl('h2', { text: 'Sidebar Resizer Settings' });

        new Setting(containerEl)
            .setName('Width increment')
            .setDesc('Amount to increase or decrease the sidebar width (e.g., "50px" or "10%")')
            .addText(text => text
                .setPlaceholder('Enter increment')
                .setValue(this.plugin.settings.increment)
                .onChange(async (value) => {
                    this.plugin.settings.increment = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Left sidebar standard width')
            .setDesc('Standard width for the left sidebar (e.g., "100px" or "20%")')
            .addText(text => text
                .setPlaceholder('Enter standard width')
                .setValue(this.plugin.settings.leftSidebarStandardWidth)
                .onChange(async (value) => {
                    this.plugin.settings.leftSidebarStandardWidth = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Right sidebar standard width')
            .setDesc('Standard width for the right sidebar (e.g., "100px" or "20%")')
            .addText(text => text
                .setPlaceholder('Enter standard width')
                .setValue(this.plugin.settings.rightSidebarStandardWidth)
                .onChange(async (value) => {
                    this.plugin.settings.rightSidebarStandardWidth = value;
                    await this.plugin.saveSettings();
                }));
    }
}

