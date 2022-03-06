import styled from 'styled-components';
import { genObject } from '../interfaces/IGeneral';
//import waves from '../images/waves.png';

/*** Style-values ***/
export const styleValues: genObject = {
  siteWidth: `100%`,
  mainContainerWidth: '1000px',
  containerWidth: '625px',
  asideWidth: '300px',

  makeArticle: {
    formGap: '1em',

    richText: {
      minHeight: '260px',
      maxHeight: '400px',
    }
  },
};


/*** Base styles (Bootstrap-inspired) ***/
export const BaseClass = styled.div`
  margin: 0;
  & > * {margin: 0 auto;}

  .container {
    max-width: 3000px;
    min-width: 320px;
    height: 100%;

    & > * {
      margin: 0 4%;

      @media(max-width: 900px) {
        margin: 0;
      }
    }
  }

  .dark-gradient {
    color: white;
    background: black;
    color: ${props => props.theme.primaryText};
    background: linear-gradient(black, ${props => props.theme.primaryColor});
  }

  .button {
    height: 40px;
    border-radius: 5px;
    background: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.secondaryText};
    border: none;
    overflow: hidden;

    &:hover {
      box-shadow: 5px 5px 5px rgba(0, 0, 0, .5);
    }

    &:active {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, .8);
    }
  }

  .flex-row {display: flex; flex-direction: row;}
  .flex-column {display: flex; flex-direction: column;}
  .justify-between {justify-content: space-between;}
  .justify-self-center {justify-self: center;}
  .align-center {align-items: center;}
  .text-center {text-align: center;}

  .width-800 {max-width: 800px !important;}
  .width-300 {max-width: 300px !important;}
  .height-100 {height: 100px !important;}
  .height-250 {height: 250px !important;}

  .m1 {margin: 1em !important;}
  .mb-3 {margin-bottom: .3em !important;}
  .mb1 {margin-bottom: 1em !important;}
  .mb2 {margin-bottom: 2em !important;}
  .mr-5 {margin-right: .5em !important;}
  .mr1 {margin-right: 1em !important;}
`;


/*** Container ***/
// export const Container = styled.div`

//   padding: 0;
// `;

//Background-color
export const BackgroundColor = styled.div`
margin: 0 auto;
  width: 100%;
  height: 100%;
  background: black;
  background: linear-gradient(black, ${props => props.theme.primaryColor});
`;

/*** Basic Form-styles ***/
export const Form = styled(BaseClass)<{theme: genObject}>`
  fieldset {
    padding: 1em;
    border: dashed 1px #ccc;
  }

  legend {
    color: #aaa;
  }

  label {
    font-size: 1.2em;
    color: #444;
  }

  input[type='text'], input[type='password'], input[type='email'] {
    font-size: 1.2em;
    padding: .5em;
    margin: 0;
  }

  input[type='color'] {
    height: 45.6px;
    padding: .5em;
    border: none;
    padding: 0;
    width: 80px;
  }

  input[type='file'] {
    font-size: 1.2em;
    padding: .5em;
    border-radius: 5px;
    border: solid 1px #888;
  }

  .form-img {
    max-width: 100%;
    height: 400px;
    max-height: 400px;
    object-fit: cover;
  }

  input[type='submit'], .submit {
    font-size: 1.2em;
    padding: .5em 1em;
    background: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.secondaryText};
    border-radius: 5px;
    border: solid 1px #888;
    width: 100%;
    cursor: pointer;
  }

  textarea {
    font-size: 1em;
    font-family: sans-serif;
    padding: .5em;
  }
`;


export const Title1 = styled('h1')<{text: string}>`
  color: ${props => props.text};
  font-size: 2em;
`;


export const Title2 = styled.h2`
  color: ${props => props.color};
  font-size: 1.8em;
`;


export const Button = styled.button`
  height: 40px;
  border-radius: 5px;
  background: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.secondaryText};
  border: none;
  overflow: hidden;

  &:hover {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .5);
  }

  &:active {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .8);
  }
`;


export const Page = styled.div`
  margin-top: 1em;

  p, ul {
    margin-bottom: 1em;
  }

  p {}

  h3 {
    margin-bottom: .2em;
  }

  ul {
    list-style-position: inside;
  }

  img {
    width: 100%;
  }

  .grid {
    --border-color: #ddd;
    border: solid 1px var(--border-color);
    .row-3 {
      padding: .7em;
      display: grid;
      grid-template-columns: 3fr 2fr 1fr;
      border-bottom: solid 1px var(--border-color);

      p {
        margin: 0;
      }

      .person {
        font-size: 150px;
        width: 150px;
        height: 190px;
        color: white;
        background: black;
      }
    }
  }

  .row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1em;
  }

  .caption {
    font-size: .9em;
    color: #aaa;
  }
`;

export const Middle = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  column-gap: 1.5em;
  max-width: 100%;
  margin: 0 2em;
  background: white;
  padding: 1em 4em 2em;
  box-shadow: 5px 0 10px rgba(0, 0, 0, .3), -5px 0 10px rgba(0, 0, 0, .3);

  @media(max-width: 700px) {
    margin: 0;
    padding: .7em 2em 1em;
  }

`;

