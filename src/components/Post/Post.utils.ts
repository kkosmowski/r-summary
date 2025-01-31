// function clones element and returns height of this element with either flex-direction row or column
export const getHeightOfElementWithDirection = (container: HTMLElement, direction: 'row' | 'column') => {
  const cloned = container.cloneNode(true) as HTMLElement;
  // make sure element is hidden
  cloned.style.position = 'absolute';
  cloned.style.zIndex = '-9999';
  // limit width to simulate original element
  cloned.style.width = container.clientWidth + 'px';

  const elementToMock = container.querySelector('video') ?? container.querySelector('img');

  if (elementToMock) {
    const mock = document.createElement('div');
    mock.style.width = elementToMock.clientWidth + 'px';
    mock.style.height = elementToMock.clientHeight + 'px';

    const elementToReplace = cloned.querySelector('video') ?? cloned.querySelector('img');
    elementToReplace!.replaceWith(mock);
  }

  cloned.style.flexDirection = direction;

  document.body.appendChild(cloned);
  const height = cloned.clientHeight;
  document.body.removeChild(cloned);
  return height;
};
