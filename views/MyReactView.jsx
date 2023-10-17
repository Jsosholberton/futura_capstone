import React from 'react';
function MyReactView(props) {
  const { newData } = props;

  const divStyle = {
    padding: '1rem',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  };

  const h1Style = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '0.5rem',
  };

  const pStyle = {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '0.5rem',
  };

  return (
    <div style={divStyle}>
      <h1 style={h1Style}>The information of {newData.properties.Nombre.title[0].text.content} has updated success</h1>
      <p style={pStyle}>Skills: {newData.properties["Que lo hace único?"].rich_text[0].text.content}</p>
      <p style={pStyle}>Tech stack: {newData.properties["Tech Stack"].rich_text[0].text.content}</p>
      <p style={pStyle}>Experience: {newData.properties["Experiencia Laboral"].rich_text[0].text.content}</p>
      <p style={pStyle}>Education: {newData.properties["Educación"].rich_text[0].text.content}</p>
      <p style={pStyle}>Compañía: {newData.properties["Compañía"].rich_text[0].text.content}</p>
      <p style={pStyle}>Empresa: {newData.properties["Empresa"].rich_text[0].text.content}</p>
      <p style={pStyle}>Empresa1: {newData.properties["Empresa1"].rich_text[0].text.content}</p>
    </div>
  );
}

export default MyReactView;
