// 获取相关DOM元素
const linkContainer = document.getElementById('linkContainer');
const urlInput = document.getElementById('urlInput');
const addButton = document.getElementById('addButton');
const deleteButton = document.getElementById('deleteButton');

// 存储已勾选链接的数组
let checkedLinks = [];

// 从文件中读取初始链接列表并添加到页面的函数
async function loadInitialLinks() {
  try {
    const response = await fetch('/linkList.txt');
    const data = await response.text();
    const links = data.split('\n');
    for (let i = 0; i < links.length; i++) {
      if (links[i].trim()) {
        addLink(links[i]);
      }
    }
  } catch (error) {
    console.error('读取初始链接列表出错：', error);
  }
}

// 添加链接的函数
function addLink(url) {
  if (url) {
    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.target = '_blank';
    linkElement.textContent = url;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        checkedLinks.push(linkElement.href);
      } else {
        const index = checkedLinks.indexOf(linkElement.href);
        if (index!== -1) {
          checkedLinks.splice(index, 1);
        }
      }
    });

    const listItem = document.createElement('li');
    listItem.appendChild(checkbox);
    listItem.appendChild(linkElement);

    linkContainer.appendChild(listItem);

    updateLinkListDat();
  }
}

// 更新linkList.dat文件的函数
async function updateLinkListDat() {
  const links = [];
  const linkItems = linkContainer.querySelectorAll('li');
  for (let i = 0; i < linkItems.length; i++) {
    const linkElement = linkItems[i].querySelector('a');
    links.push(linkElement.href);
  }

  try {
    const data = links.join('\n');
    const response = await fetch('/linkList.txt', {
      method: 'PUT',
    });
    if (!response.ok) {
      console.error('更新linkList.dat文件出错：', response.statusText);
    }
  } catch (error) {
    console.error('更新linkList.dat文件出错：', error);
  }
}

// 给添加按钮添加点击事件监听器
addButton.addEventListener('click', function () {
  const url = urlInput.value;
  addLink(url);
  urlInput.value = '';
});

// 给删除按钮添加点击事件监听器
deleteButton.addEventListener('click', function () {
  const linkItems = linkContainer.querySelectorAll('li');
  for (let i = 0; i < linkItems.length; i++) {
    const checkbox = linkItems[i].querySelector('input[type=checkbox]');
    if (checkbox.checked) {
      linkContainer.removeChild(linkItems[i]);
    }
  }
  checkedLinks = [];
  updateLinkListDat();
});

// 加载初始链接列表
loadInitialLinks();