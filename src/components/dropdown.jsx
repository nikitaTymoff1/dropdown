import React from 'react'
import './dropdown.css'

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.items = this.props.names;
        this.state = {
            text: '',
            suggestions: [],
            chosenSuggestion: 0,
            startIndex: 0,
            endIndex: 5
        };

    }
    onInputTextChange = (event) => {
        const value = event.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(item => regex.test(item))
        }

        // this.setState({text: value});
        // let str = this.state.text.toLowerCase();
        // this.items.map(item => {
        //     if (item.toLowerCase().match(str)) {
        //         suggestions.push(item)
        //     }
        // });
        this.setState({suggestions: suggestions, text: value});
    };
    renderSuggestions = () => {
        const suggestions = this.state.suggestions;
        if (suggestions.length === 0) return null;
        return (
            <ul className='list'>
                {suggestions.map((item, index) => {
                    if (index >= this.state.startIndex && index < this.state.endIndex)
                        return (
                            <li onClick={() => this.selectSuggestion(item)}
                                key={item}
                                style={this.state.chosenSuggestion === index ? {background: 'rgba(128, 128, 128, 0.20)'} : null}
                            >{item}
                            </li>);
                    else
                        return null;
                })}

            </ul>
        )
    };
    selectSuggestion = (value) => {
        this.setState({text: value, suggestions: []})
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.setState({text: this.state.suggestions[this.state.chosenSuggestion], suggestions:[]})
        } else if (event.key === 'ArrowUp' && this.state.chosenSuggestion > 0) {
            let temp = this.state.chosenSuggestion - 1;
            this.setState({chosenSuggestion: temp});
            if (this.state.chosenSuggestion < this.state.startIndex + 1) {
                let temp2 = this.state.endIndex - 1;
                let temp1 = this.state.startIndex - 1;
                this.setState({endIndex: temp2, startIndex: temp1})
            }
        } else if (event.key === 'ArrowDown' && this.state.chosenSuggestion < this.state.suggestions.length - 1) {
            let temp = this.state.chosenSuggestion + 1;
            this.setState({chosenSuggestion: temp});
            if (this.state.chosenSuggestion >= this.state.endIndex - 1) {
                let temp2 = this.state.endIndex + 1;
                let temp1 = this.state.startIndex + 1;
                this.setState({endIndex: temp2, startIndex: temp1})
            }
        }
    };

    onBlur = (e) => {
      console.log(e.target.className)
    };

    render() {
        return (
            <div className='main-section' onBlur={this.onBlur}>
                <div className="dropdown" onKeyDown={this.handleKeyPress}>
                        <input
                            type="text"
                            value={this.state.text}
                            onChange={this.onInputTextChange}
                        />
                    {this.renderSuggestions()}
                </div>
                <button>Search</button>
            </div>
        )
    }
}

export default Dropdown;