import React, {useState, useRef} from "react";
import styled from "styled-components";

const Autocomplete = props => {
    console.log("props to Autocomplete:", props);
    const [state, setState] = useState({
        input: "",// user input
        suggestions: props.suggestions,// passed suggestion list
        showSuggestions: false,
        filteredSuggestions: [],
        suggestionIndex: 0,// index of currently selected suggestion
    });
    const inputRef = document.getElementsByClassName("autocomplete-input");
    const activeSuggestionRef = useRef(null)//document.getElementsByClassName("active-suggestion");
    // useEffect(() => {
    //     const ref = document.getElementsByClassName("autocomplete-input");
    //     console.log("TCL: ref", ref);
    //     // ref.innerHTML = state.input;
    //     // ref.value = state.input;
    //     console.log("state", ref)
    // }, [state]);
    const onChange = event => {
        const currentInput = event.currentTarget.value;
        setState({
            ...state,
            input: currentInput,
            showSuggestions: true,
            filteredSuggestions: getSuggestions(state.suggestions, currentInput),
            suggestionIndex: 0
        })
    }
    const getSuggestions = (suggestions, input) => {
        return suggestions
            .filter(item => item.toLowerCase().indexOf(input.toLowerCase()) !== -1)
            .sort();
    }
    const onClick = event => {// attached to onMouseDown because it fires earlier, fixing blur issue with parent container
        event.stopPropagation();
        const suggestion = event.currentTarget.innerHTML;
        console.log("TCL: suggestion", suggestion)
        event.currentTarget.focus();
        setState({
            ...state,
            showSuggestions: false,
            input: event.currentTarget.innerHTML,
        })
    }
    const onBlur = event => {
        event.stopPropagation();
        event.currentTarget.blur();
        setState({
            ...state,
            showSuggestions: false,
        })
    }
    const onKeyDown = event => {
        console.log(event.key)
        switch (event.keyCode){
            case 27: //esc
                onBlur(event);
                break;
            case 13: //enter
                setState({
                    ...state,
                    showSuggestions: false,
                    input: activeSuggestionRef.current.innerHTML,
                })
                break;
            case 40: //down arrow
                if (state.showSuggestions){
                    
                    setState({
                        ...state,
                        suggestionIndex: Math.min(state.suggestionIndex + 1, state.filteredSuggestions.length),
                    });
                    console.log(state.suggestionIndex)
                }
                break;
            case 38: //up arrow
                if (state.showSuggestions){
                    setState({
                        ...state,
                        suggestionIndex: Math.max(state.suggestionIndex - 1, 0),
                    });
                    console.log(state.suggestionIndex)
                }
                break;
            default:
                break;
        }
    }
    return (
        <StyledContainer onBlur={onBlur}>
            <StyledInput type="text" className="autocomplete-input" value={state.input} onChange={onChange} onKeyDown={onKeyDown}/>
            {state.input.length && state.showSuggestions && state.filteredSuggestions ? (
                <StyledList className="suggestion-list" >
                    {state.filteredSuggestions.map((suggestion, index) => {
                        const classname = index === state.suggestionIndex ? "active-suggestion" : "inactive-suggestion"
                        return (
                            <StyledSuggestion className={classname} key={suggestion} onMouseDown={onClick} value={suggestion} ref={classname === "active-suggestion" ? activeSuggestionRef : null}>
                                {suggestion}
                            </StyledSuggestion>
                        );
                    })}
                </StyledList>
            ) : null}
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33vw;
    height: 20vh;
    font-family: sans-serif;
`;

const StyledInput = styled.input`
    font-size: 2em;
    appearance: none;
    width: 100%;
    height: 10vh;
    margin: 0;
    padding: 0;
`;
const StyledList = styled.ul`
    border: 1px darkgray solid;
    width: 100%;
    margin: 0;
    padding: 0;
    /* overflow-y: auto; */
`;
const StyledSuggestion = styled.li`
    /* text-align: left; */
    font-size: 2em;
    appearance: none;
    width: 100%;    
    /* height: 10vh; */
    list-style: none;
    margin: 0;
    padding: 0;
    &.active-suggestion {
        border: 1px green solid;
        background-color: chartreuse;
    }
    
`;

export default Autocomplete;