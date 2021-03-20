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
        
        // Label's Footnote
        footnote = document.createElement('sup');
        footnote.innerHTML = footnoteNumber++;
        itemLabel.appendChild(footnote);
        
        // Combine
        subContainer.appendChild(inputItem);
        subContainer.appendChild(itemLabel);
        
        container.appendChild(subContainer);
    }
});

function blockNewline(elementId) {
    document.getElementById(elementId).addEventListener('keypress', (event) => {
        if (event.which === 13) {
            event.preventDefault();
        }
    });
}

function clearOnClick(elementId) {
    document.getElementById(elementId).addEventListener('click', (event) => {
        if (event.target.getAttribute('data-empty') === 'true') {
            event.target.innerHTML = '';
            event.target.setAttribute('data-empty', 'false');
            event.target.classList.remove('spacer');
        }
    });
}

function dateOnClick(elementId) {
    document.getElementById(elementId).addEventListener('click', (event) => {
        if (event.target.getAttribute('data-empty') === 'true') {
            event.target.innerHTML = new Date().toDateString();
            event.target.setAttribute('data-empty', 'false');
            event.target.classList.remove('spacer');
        }
    });
}

blockNewline('nameInput');
blockNewline('dateString');
clearOnClick('nameInput');
dateOnClick('dateString');
