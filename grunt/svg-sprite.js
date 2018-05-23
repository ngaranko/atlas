module.exports = {
    basic: {
        cwd: 'modules/shared/assets/svg-icons',
        src: ['*.svg'],
        dest: '',
        options: {
            shape: {
                spacing: {
                    // top, right, bottom, left spacing around each icon in the
                    // sprite in pixels
                    padding: [0, 1, 0, 1]
                }
            },
            mode: {
                css: {
                    dest: 'build',
                    sprite: 'assets/images/icons.svg',
                    layout: 'horizontal',
                    prefix: 'dp-%s-icon',
                    dimensions: false,
                    render: {
                        scss: {
                            template: 'grunt/svg-sprite-template/icons.mustache',
                            dest: '../src/shared/styles/config/mixins/_icons.scss'
                        }
                    }
                }
            }
        }
    },
    themas: {
        cwd: 'modules/shared/assets/svg-icons/thema',
        src: ['*.svg'],
        dest: '',
        options: {
            shape: {
                spacing: {
                    // top, right, bottom, left spacing around each icon in the
                    // sprite in pixels
                    padding: [0, 1, 0, 1]
                }
            },
            mode: {
                css: {
                    dest: 'build',
                    sprite: 'assets/images/icons-thema.svg',
                    layout: 'horizontal',
                    prefix: 'dp-%s-icon',
                    common: 'svg-common-thema',
                    dimensions: false,
                    render: {
                        scss: {
                            template: 'grunt/svg-sprite-template/icons.thema.mustache',
                            dest: '../src/shared/styles/config/mixins/_icons-thema.scss'
                        }
                    }
                }
            }
        }
    }
};
