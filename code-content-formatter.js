document.addEventListener('DOMContentLoaded', (event) => {

  const codeElements = document.querySelectorAll(".content");

  for (var codeElement of codeElements) {
    const language = codeElement.id;
    router(language, codeElements);
  }

});

function router(language, codeElements) {
  switch (language) {
    case 'css':
      formatCSS(codeElements[0]);
      setLinesNumber(codeElements);
      break;
    default:
      setLinesNumber(codeElements);
  }
}

function formatCSS(codeElement) {

  var textContentStore = codeElement.textContent;

  const cssPropertyPattern = /(?<!\.)\b([\w-]+)\s*:/g;
  const cssClassPattern = /^(.*?)(?=\s*\{)/gm;
  const commentDoubleQuotePattern = /"([^"\n]+)"/g;
  const commentSimpleQuotePattern = /'([^"\n]+)'/g;
  const commentPattern = /(^\s*\/\/.*$)/mg;
  const values = /:([^\n]+);/g;

  textContentStore = textContentStore.replace(commentDoubleQuotePattern, '<span class="string">\"$1\"</span>');
  textContentStore = textContentStore.replace(commentSimpleQuotePattern, '<span class="string">\'$1\'</span>');
  textContentStore = textContentStore.replace(commentPattern, '<span class="comment">$1</span>');

  textContentStore = textContentStore.replace(cssPropertyPattern, '<span class="css-property">$1</span>:');
  textContentStore = textContentStore.replace(cssClassPattern, '<span class="css-class">$1</span>');
  textContentStore = textContentStore.replace(values, ':<span class="css-value">$1</span>;');

  codeElement.innerHTML = textContentStore;
  formatColorValuesCSS();
}

function formatColorValuesCSS() {
  const colorSpans = document.querySelectorAll(".css-value");

  colorSpans.forEach(function(span) {

    if (span.textContent.includes('#')) {
      span.style.backgroundColor = span.textContent;
      const brightness = isDark(span.textContent);

      if (brightness) {
        span.style.color = "white";
        return;
      }

      span.style.color = "black";
    }
  });

}

function isDark(bgColor) {
    if (!bgColor) { return ''; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? false : true;
}

function setLinesNumber(codeElements) {
  codeElements.forEach(function(codeElement) {
    codeElement.innerHTML = codeElement.innerHTML.replace(/^(.*)$/gm, '<span class="line">$1</span>');
  });
}
