export default function styleConsole(backgroundColor, color = 'white') {
  let styles = `background-color: ${backgroundColor}; border-radius: 4px; padding: 2px 4px;`;

  if (color) {
    styles += ` color: ${color};`;
  }

  return [styles, ''];
}
