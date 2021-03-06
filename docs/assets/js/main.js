/* 
 * The MIT License
 *
 * Copyright 2021 Jayson Fong <contact@jaysonfong.org>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Loads up the conservation methods dynamically
 * @param {array} data
 * @type type
 */
$.getJSON('./assets/data/main.json', function(data) {
    container = document.getElementById('pledgeItemHolder');
    footnotes = document.getElementById('footnotes');
    var itemIndex, footnoteNumber = 1;
    for (itemIndex in data.pledgeItems) {
        subContainer = document.createElement('div');
        subContainer.classList.add('pledgeItem');
        
        // Input
        inputItem = document.createElement('input');
        inputItem.setAttribute('type', 'checkbox');
        inputItem.setAttribute('id', 'pledgeItem_' + itemIndex);
        
        // Label
        itemLabel = document.createElement('label');
        itemLabel.setAttribute('for', 'pledgeItem_' + itemIndex);
        itemLabel.innerHTML = data.pledgeItems[itemIndex].description;
        
        // Label's Footnote Link
        footnoteLink = document.createElement('a');
        footnoteLink.setAttribute('href', '#pledgeItemNote_' + itemIndex);
        footnote = document.createElement('sup');
        footnote.innerText = footnoteNumber++;
        footnoteLink.appendChild(footnote);
        itemLabel.appendChild(footnoteLink);
        
        // Combine
        subContainer.appendChild(inputItem);
        subContainer.appendChild(itemLabel);
        container.appendChild(subContainer);
        
        // Item's Footnote Container
        footnoteContainer = document.createElement('div');
        footnoteContainer.setAttribute('id', 'pledgeItemNote_' + itemIndex);
        footnoteContainer.classList.add('detail');
        
        // Item's Footnote Text
        footnoteText = document.createElement('span');
        footnoteText.innerText = data.pledgeItems[itemIndex].detail;
        footnoteText.classList.add('detail');
        
        // Item's Footnote Number
        footnoteSideNumber = footnote.cloneNode(true);
        footnoteSideNumber.setAttribute('id', 'pledgeItemFootnoteNumber_' + itemIndex);
        
        // Combine Footnote
        footnoteContainer.appendChild(footnoteSideNumber);
        footnoteContainer.appendChild(footnoteText);
        footnotes.appendChild(footnoteContainer);        
    }
});

/**
 * Stops a newline from being entered into an input.
 * @param {string} elementId
 * @returns {undefined}
 */
function blockNewline(elementId) {
    document.getElementById(elementId).addEventListener('keypress', (event) => {
        if (event.which === 13) {
            event.preventDefault();
        }
    });
}

/**
 * Sets an element's inner text to the current date.
 * @param {string} elementId
 * @returns {void}
 */
function setDate(elementId) {
    var element = document.getElementById(elementId);
    element.innerText = new Date().toDateString();
    element.setAttribute('data-empty', 'false');
    element.classList.remove('spacer');
}

/**
 * Trims an element's inner text
 * @param {string} elementId
 * @param {string} type
 * @returns {void}
 */
function unspaceOn(elementId, type) {
    document.getElementById(elementId).addEventListener(type, (event) => {
        if (event.target.getAttribute('data-empty') === 'true') {
            event.target.setAttribute('data-empty', 'false');
            event.target.classList.remove('spacer');
            event.target.innerText = event.target.innerText.trim();
        }
    });
}

/**
 * Initiates the print function on click
 * @param {string} elementId
 * @returns {void}
 */
function printOnClick(elementId) {
    document.getElementById(elementId).addEventListener('click', (event) => {
        window.print();
    });
}

/**
 * Switches the font between fancy/plain on click
 * @param {string} elementId
 * @returns {void}
 */
function changeFontOnClick(elementId) {
    document.getElementById(elementId).addEventListener('click', (event) => {
        if (document.body.classList.contains('plainFont')) {
            document.body.classList.remove('plainFont');
            event.target.classList.remove('plainFont');
            event.target.innerText = 'Switch to Plain Edition';
        } else {
            document.body.classList.add('plainFont');
            event.target.classList.add('plainFont');
            event.target.innerText = 'Switch to Fancy Edition';
        } 
    });
}

blockNewline('nameInput');
blockNewline('dateString');
setDate('dateString');
unspaceOn('nameInput', 'click');
unspaceOn('nameInput', 'input');
unspaceOn('dateString', 'input');
printOnClick('printButton');
changeFontOnClick('plainButton');
