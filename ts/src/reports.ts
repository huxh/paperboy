import {
    Widget, DockPanel, BoxPanel
} from '@phosphor/widgets';

import {request, RequestResult} from './request';
import {DomUtils} from './utils';

class Configurator extends Widget {
    static createNode(): HTMLDivElement {
        return document.createElement('div');
    }

    constructor(){
        super({node: Configurator.createNode()});
        this.title.closable = false;
        this.title.label = 'Configurator';
    }
}

export
class Reports extends DockPanel {
    constructor(){
        super();
        this.setFlag(Widget.Flag.DisallowLayout);
        this.title.label = 'Reports';
        this.node.id = 'reports';
        this.node.classList.add('reports');

        this.mine.title.closable = false;
        this.mine.title.label = 'My Reports';

        request('get', '/api/v1/reports').then((res: RequestResult) => {
            DomUtils.createSubsection(this.mine, 'reports', res.json());
        });
        this.addWidget(this.mine);
        this.addWidget(new Configurator(), {mode: 'tab-after', ref: this.mine});
    }

    private mine = new BoxPanel();
}