'use client';

import {MantineProvider, createTheme, MantineTheme} from '@mantine/core';
import React from "react";

const GLOBAL_BACKGROUND_IMAGE_URL = '/background.png';

const myTheme = createTheme({
    // Colors
    colors: {
        primaryGreen: [
            '#e9fbee', '#d0f2da', '#a0e4b6', '#70d691', '#4bc972',
            '#36b15d', '#2c8d4a', '#226a38', '#174726', '#0d2414'
        ],
        accentRed: [
            '#ffebeb', '#ffc2c2', '#ff9999', '#ff7070', '#ff4747',
            '#e03d3d', '#b33030', '#862424', '#591818', '#2c0c0c'
        ],
        neutralGray: [
            '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd',
            '#868e96', '#495057', '#343a40', '#212529', '#0d0d0d'
        ]
    },
    primaryColor: 'primaryGreen',

    // Fonts
    fontFamily: 'Roboto, sans-serif',
    headings: {
        fontFamily: 'Playfair Display, serif',
        sizes: {
            h1: { fontSize: '2.5rem' },
            h2: { fontSize: '2rem' },
            h3: { fontSize: '1.75rem' },
            h4: { fontSize: '1.5rem' },
            h5: { fontSize: '1.25rem' },
            h6: { fontSize: '1rem' },
        },
    },

    // Component defaults
    components: {
        Button: {
            defaultProps: {
                radius: 'md',
            },
            styles: (theme: MantineTheme) => ({
                root: {
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows.sm,
                    },
                },
            }),
        },
        TextInput: {
            defaultProps: {
                radius: 'sm',
            },
            styles: (theme: MantineTheme) => ({
                input: {
                    borderColor: theme.colors.neutralGray[3],
                    '&focusWithin': {
                        borderColor: theme.colors.primaryGreen[5],
                        boxShadow: `0 0 0 1px ${theme.colors.primaryGreen[3]}`,
                    },
                },
            }),
        },
        Textarea: {
            defaultProps: {
                radius: 'sm',
            },
            styles: (theme: MantineTheme) => ({
                input: {
                    borderColor: theme.colors.neutralGray[3],
                    '&focusWithin': {
                        borderColor: theme.colors.primaryGreen[5],
                        boxShadow: `0 0 0 1px ${theme.colors.primaryGreen[3]}`,
                    },
                },
            }),
        },
        DateInput: {
            defaultProps: {
                radius: 'sm',
            },
            styles: (theme: MantineTheme) => ({
                input: {
                    borderColor: theme.colors.neutralGray[3],
                    '&focusWithin': {
                        borderColor: theme.colors.primaryGreen[5],
                        boxShadow: `0 0 0 1px ${theme.colors.primaryGreen[3]}`,
                    },
                },
            }),
        },
        FileInput: {
            defaultProps: {
                radius: 'sm',
            },
            styles: (theme: MantineTheme) => ({
                input: {
                    borderColor: theme.colors.neutralGray[3],
                    '&focusWithin': {
                        borderColor: theme.colors.primaryGreen[5],
                        boxShadow: `0 0 0 1px ${theme.colors.primaryGreen[3]}`,
                    },
                },
            }),
        },
        AppShell: {
            styles: () => ({
                main: {
                    backgroundImage: `url('${GLOBAL_BACKGROUND_IMAGE_URL}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                },
            }),
        },
    },
    shadows: {
        sm: '0 1px 3px rgba(0,0,0,.05), 0 1px 2px rgba(0,0,0,.1)',
        md: '0 4px 6px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.05)',
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    }
});

function MantineThemeWrapper({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider
            theme={myTheme}
            defaultColorScheme="light"
        >
            {children}
        </MantineProvider>
    );
}

export default MantineThemeWrapper;