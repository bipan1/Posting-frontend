const path = require("path");
const { version } = require("./package.json");

module.exports = {
    title: `Smart-MIS Style Guide 
            Version: ${version}`,
    require: [
        path.join(__dirname, "./src/App.scss"),
        path.join(__dirname, "./styleguide/styleguide.theme.css")
    ],
    styleguideComponents: {
        Logo: path.join(__dirname, "./styleguide/styleguide.logo")
    },
    theme: {
        fontSize: {
            base: 14,
            text: 16,
            small: 13,
            h1: 38,
            h2: 32,
            h3: 18,
            h4: 18,
            h5: 16,
            h6: 16
        },
        color: {
            base: "#000",
            sidebarBackground: "#0258ab",
            link: "#ffffff",
            linkHover: "none"
        },
        fontFamily: {
            base:
                '"proxima-nova", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            monospace: 'Consolas, "Liberation Mono", Menlo, monospace'
        },
        sidebarWidth: 250
    },
    styles: {
        ComponentsList: {
            heading: {
                fontWeight: "700 !important"
            }
        },
        Heading: {
            heading1: {
                display: "block",
                position: "relative",
                paddingBottom: ".75rem",
                marginBottom: ".75rem",
                fontWeight: 700,
                "&:before": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "5rem",
                    height: "6px",
                    backgroundColor: "#0258ab",
                    borderRadius: "4px"
                },
                "& > a": {
                    fontWeight: "700 !important"
                }
            },
            heading2: {
                marginBottom: "0.5rem"
            },
            heading3: {
                borderBottom: "thin solid #aec0c6",
                paddingBottom: "0.25rem",
                marginBottom: "1rem",
                textTransform: "uppercase",
                fontWeight: "700"
            }
        },
        ReactComponent: {
            tabs: {
                backgroundColor: "#ebf1f3",
                padding: "1rem",
                overflow: "auto"
            },
            tabButtons: {
                marginBottom: 0
            }
        },
        SectionHeading: {
            sectionName: {
                display: "block",
                paddingTop: "1rem !important",
                textDecoration: "none !important",
                "&:hover": {
                    opacity: 0.75
                }
            }
        },
        StyleGuide: {
            content: {
                paddingTop: "2.5rem",
                "@media (max-width: 600px)": {
                    padding: "1rem"
                }
            },
            logo: {
                border: 0,
                paddingBottom: 0,
                "& .rsg-logo": {
                    display: "block",
                    color: "#000",
                    margin: 0,
                    padding: "0.5rem",
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily:
                        '"proxima-nova", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    transition: "all 250ms ease",
                    cursor: "pointer",
                    "&:after, &:hover:after": {
                        content: '"\\2197"',
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: "0.5rem",
                        opacity: 0.25,
                        transition: "all 250ms ease",
                        cursor: "pointer"
                    },
                    "&:hover:after": {
                        opacity: 0.75,
                        color: "#000"
                    }
                },
                "& .rsg-logo-name, & .rsg-logo-version": {
                    display: "inline-block",
                    verticalAlign: "middle",
                    pointerEvents: "none"
                },
                "& .rsg-logo-name": {
                    fontWeight: 700
                },
                "& .rsg-logo-version": {
                    marginLeft: "0.5rem",
                    opacity: 0.5
                }
            },
            sidebar: {
                border: 0,
                "& li > a": {
                    color: "#fff !important"
                }
            }
        },
        TabButton: {
            button: {
                width: "100%"
            },
            isActive: {
                border: 0
            }
        },
        Table: {
            table: {
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                minWidth: "600px"
            },
            cellHeading: {
                borderBottom: "thin solid #aec0c6"
            },
            cell: {
                paddingBottom: 0,
                "& p": {
                    marginBottom: "0.5rem !important"
                },
                '& div[class*="para"]': {
                    marginBottom: "0.5rem !important"
                }
            }
        }
    },
    ignore: ['**/customStyles.js'],
    sections: [
        {
            name: "UI Components",
            components: ["./src/components/**/*.jsx","./src/components/**/*.js"],
            exampleMode: "collapse",
            usageMode: "expand"
        },
        {
            name: "Core UI Components",
            components: ["./src/core/**/*.jsx","./src/core/**/*.js"],
            exampleMode: "collapse",
            usageMode: "expand"
        }
    ]
};