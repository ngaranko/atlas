module.exports = {
    basic: {
        cwd: 'modules/shared/assets/svg-icons',
        src: ['*.svg'],
        dest: '',
        options: {
            mode: {
                css: {
                    dest: 'modules/shared',
                    sprite: 'assets/images/icons.svg',
                    prefix: 'dp-%s-icon',
                    layout: 'horizontal',
                    dimensions: false,
                    render: {
                        scss: {
                            template: 'template.mustache',
                            dest: 'styles/config/mixins/_icons.scss'
                        }
                    }
                }
            }
        }
    }
};
