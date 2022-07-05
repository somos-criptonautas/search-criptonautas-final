import Frame from './Frame';
import AppContext from '../AppContext';
import {ReactComponent as SearchIcon} from '../icons/search.svg';
import {ReactComponent as ClearIcon} from '../icons/delete.svg';

const React = require('react');

const StylesWrapper = () => {
    return {
        modalContainer: {
            zIndex: '3999999',
            position: 'fixed',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        },
        frame: {
            common: {
                margin: 'auto',
                position: 'relative',
                padding: '0',
                outline: '0',
                width: '100%',
                opacity: '1',
                overflow: 'hidden',
                height: '100%'
            }
        },
        page: {
            links: {
                width: '600px'
            }
        }
    };
};

class PopupContent extends React.Component {
    static contextType = AppContext;

    componentDidMount() {
        // Handle Esc to close popup
        if (this.node) {
            this.node.focus();
            this.keyUphandler = (event) => {
                const eventTargetTag = (event.target && event.target.tagName);
                if (event.key === 'Escape' && eventTargetTag !== 'INPUT') {
                    // this.context.onAction('closePopup');
                }
            };
            this.node.ownerDocument.removeEventListener('keyup', this.keyUphandler);
            this.node.ownerDocument.addEventListener('keyup', this.keyUphandler);
        }
        this.sendContainerHeightChangeEvent();
    }

    sendContainerHeightChangeEvent() {

    }

    componentDidUpdate() {
        this.sendContainerHeightChangeEvent();
    }

    componentWillUnmount() {
        if (this.node) {
            this.node.ownerDocument.removeEventListener('keyup', this.keyUphandler);
        }
    }

    handlePopupClose(e) {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            this.context.onAction('closePopup');
        }
    }

    render() {
        return (
            <Search />
        );
    }
}

function Search() {
    return (
        <> 
            <div className='bg-[rgba(0,0,0,0.2)] h-screen w-screen pt-20'>
                <div className='bg-white max-w-lg rounded-lg shadow-xl m-auto'>
                    <div className='flex items-center py-6 px-7'>
                        <SearchIcon className='mr-3' alt='Search' />
                        <input className='grow text-[1.65rem] focus-visible:outline-none' placeholder='Search posts, tags, authors..' />
                        <ClearIcon className='ml-3 fill-gray-400' alt='Clear' />
                    </div>
                    <div className="border-t border-gray-200 py-6 px-7">
                        <h1 className="uppercase text-xs text-gray-400 font-semibold mb-2">Posts</h1>
                        <div className="py-2 -mx-7 px-7 hover:bg-gray-100 cursor-pointer">
                            <h2 className="text-[1.65rem] font-medium leading-tight text-gray-900">The DNC’s Disastrous Post-Roe Message</h2>
                            <p className="text-gray-400 leading-normal text-sm mt-0 mb-0 truncate">Democrats’ first stab at warning voters about the GOP threat with harpoons and guns and knives and rifles</p>
                        </div>
                        <div className="py-2 -mx-7 px-7 hover:bg-gray-100 cursor-pointer">
                            <h2 className="text-[1.65rem] font-medium leading-tight text-gray-900">Roberts Started A Revolution, Dems Enabled It</h2>
                            <p className="text-gray-400 leading-normal text-sm mt-0 mb-0 truncate">New data show the end of pandemic relief coincided with a 49 percent increase in the number of families struggling to survive.</p>
                        </div>
                        <div className="py-2 -mx-7 px-7 hover:bg-gray-100 cursor-pointer">
                            <h2 className="text-[1.65rem] font-medium leading-tight text-gray-900">Ending Pandemic Aid Created A Disaster</h2>
                            <p className="text-gray-400 leading-normal text-sm mt-0 mb-0 truncate">On this week’s Lever Time: David goes deep into SCOTUS, including exposing the dark money network that has been bankrolling conservative judicial nominees.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default class PopupModal extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            height: null
        };
    }

    onHeightChange(height) {
        this.setState({height});
    }

    handlePopupClose(e) {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            // this.context.onAction('closePopup');
        }
    }

    renderFrameStyles() {
        const styles = `
            :root {
                --brandcolor: ${this.context.brandColor || ''}
            }
        `;

        return (
            <>
                <link rel="stylesheet" href="http://localhost:3000/main.css" />
                <style dangerouslySetInnerHTML={{__html: styles}} />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </>
        );
    }

    renderFrameContainer() {
        const Styles = StylesWrapper();

        const frameStyle = {
            ...Styles.frame.common
        };

        return (
            <div style={Styles.modalContainer} className='gh-root-frame'>
                <Frame style={frameStyle} title="portal-popup" head={this.renderFrameStyles()}>
                    <div onClick = {e => this.handlePopupClose(e)}></div>
                    <PopupContent />
                </Frame>
            </div>
        );
    }

    render() {
        return this.renderFrameContainer();
    }
}
