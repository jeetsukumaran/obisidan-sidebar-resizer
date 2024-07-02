import { Plugin } from 'obsidian';
import { SidebarWidthPluginSettings, DEFAULT_SETTINGS, SidebarWidthSettingTab } from './settings';

export default class SidebarWidthPlugin extends Plugin {
    settings: SidebarWidthPluginSettings;

    async onload() {
        // console.log('Loading SidebarWidthPlugin');

        await this.loadSettings();

        this.addSettingTab(new SidebarWidthSettingTab(this.app, this));

        this.addCommand({
            id: 'increase-left-sidebar-width',
            name: 'Increase left sidebar width',
            callback: () => this.adjustSidebarWidth('.workspace-split.mod-left-split', this.settings.increment),
        });

        this.addCommand({
            id: 'decrease-left-sidebar-width',
            name: 'Decrease left sidebar width',
            callback: () => this.adjustSidebarWidth('.workspace-split.mod-left-split', `-${this.settings.increment}`),
        });

        this.addCommand({
            id: 'increase-right-sidebar-width',
            name: 'Increase right sidebar width',
            callback: () => this.adjustSidebarWidth('.workspace-split.mod-right-split', this.settings.increment),
        });

        this.addCommand({
            id: 'decrease-right-sidebar-width',
            name: 'Decrease right sidebar width',
            callback: () => this.adjustSidebarWidth('.workspace-split.mod-right-split', `-${this.settings.increment}`),
        });

        this.addCommand({
            id: 'toggle-left-sidebar-default',
            name: 'Toggle left sidebar (standard width)',
            callback: () => this.toggleSidebarWidth('.workspace-split.mod-left-split', this.settings.leftSidebarStandardWidth),
        });

        this.addCommand({
            id: 'toggle-right-sidebar-default',
            name: 'Toggle right sidebar (standard width)',
            callback: () => this.toggleSidebarWidth('.workspace-split.mod-right-split', this.settings.rightSidebarStandardWidth),
        });

        this.addCommand({
            id: 'set-both-sidebar-widths',
            name: 'Expand both sidebars to standard widths',
            callback: () => this.setBothSidebarWidths(this.settings.leftSidebarStandardWidth, this.settings.rightSidebarStandardWidth),
        });

        this.addCommand({
            id: 'set-both-sidebar-widths',
            name: 'Collapse both sidebars',
            callback: () => this.setBothSidebarWidths("0", "0"),
        });
    }

    onunload() {
        console.log('Unloading SidebarWidthPlugin');
    }

    adjustSidebarWidth(selector: string, adjustment: string) {
        const sidebar = document.querySelector(selector);
        if (sidebar) {
            const currentWidth = sidebar.getBoundingClientRect().width;
            let newWidth: string;

            if (adjustment.endsWith('%')) {
                const percentage = parseFloat(adjustment);
                const adjustmentPx = window.innerWidth * (percentage / 100);
                newWidth = `${currentWidth + adjustmentPx}px`;
            } else {
                const adjustmentPx = parseFloat(adjustment);
                newWidth = `${currentWidth + adjustmentPx}px`;
            }

            (sidebar as HTMLElement).style.width = newWidth;
        }
    }

    toggleSidebarWidth(selector: string, defaultWidth: string) {
        const sidebar = document.querySelector(selector);
        if (sidebar) {
            let newWidth: string;
            if (defaultWidth.endsWith('%')) {
                const percentage = parseFloat(defaultWidth);
                newWidth = `${window.innerWidth * (percentage / 100)}px`;
            } else {
                newWidth = defaultWidth;
            }

            const currentWidth = sidebar.getBoundingClientRect().width;
            if (`${currentWidth}px` === newWidth) {
                (sidebar as HTMLElement).style.width = '0px';
            } else {
                (sidebar as HTMLElement).style.width = newWidth;
            }
        }
    }

    setBothSidebarWidths(leftWidth: string, rightWidth: string) {
        const leftSidebar = document.querySelector('.workspace-split.mod-left-split');
        const rightSidebar = document.querySelector('.workspace-split.mod-right-split');

        if (leftSidebar) {
            if (leftWidth.endsWith('%')) {
                const percentage = parseFloat(leftWidth);
                (leftSidebar as HTMLElement).style.width = `${window.innerWidth * (percentage / 100)}px`;
            } else {
                (leftSidebar as HTMLElement).style.width = leftWidth;
            }
        }

        if (rightSidebar) {
            if (rightWidth.endsWith('%')) {
                const percentage = parseFloat(rightWidth);
                (rightSidebar as HTMLElement).style.width = `${window.innerWidth * (percentage / 100)}px`;
            } else {
                (rightSidebar as HTMLElement).style.width = rightWidth;
            }
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

