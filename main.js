'use sctrict';

const goods = [
  {
    id: 1,
    title: 'Смартфон Xiaomi 11T 8/128GB',
    price: 27000,
    description:
      'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    category: 'mobile-phone',
    discont: false,
    count: 3,
    units: 'шт',
    images: {
      small: 'img/smrtxiaomi11t-m.jpg',
      big: 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    id: 2,
    title: 'Радиоуправляемый автомобиль Cheetan',
    price: 4000,
    description: 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    category: 'toys',
    discont: 5,
    count: 1,
    units: 'шт',
    images: {
      small: 'img/cheetancar-m.jpg',
      big: 'img/cheetancar-b.jpg',
    },
  },
  {
    id: 3,
    title: 'ТВ приставка MECOOL KI',
    price: 12400,
    description:
      'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    category: 'tv-box',
    discont: 15,
    count: 4,
    units: 'шт',
    images: {
      small: 'img/tvboxmecool-m.jpg',
      big: 'img/tvboxmecool-b.jpg',
    },
  },
  {
    id: 4,
    title: 'Витая пара PROConnect 01-0043-3-25',
    price: 22,
    description:
      'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
    category: 'cables',
    discont: false,
    count: 420,
    units: 'v',
    images: {
      small: 'img/lan_proconnect43-3-25.jpg',
      big: 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];
const overlay = document.querySelector('.overlay');
overlay.classList.remove('active');

let numb = 2;
const createRow = obj => {
  const tr = document.createElement('tr');
  for (let item in obj) {
    if (item === 'id' || item === 'description' || item === 'discount' || item === 'images') {
      continue;
    } else {
      numb++;
      const number = document.createElement('td');
      number.classList.add('table__cell');
      number.textContent = numb;

      const title = document.createElement('td');
      title.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
      title.setAttribute('data-id', obj['id']);
      title.textContent = obj['title'];
      const spanId = document.createElement('span');
      spanId.classList.add('table__cell-id');
      spanId.textContent = `id: ${obj['id']}`;
      title.prepend(spanId);

      const category = document.createElement('td');
      category.classList.add('table__cell', 'table__cell_left');
      category.textContent = obj['category'];

      const units = document.createElement('td');
      units.classList.add('table__cell');
      units.textContent = obj['units'];

      const count = document.createElement('td');
      count.classList.add('table__cell');
      count.textContent = obj['count'];

      const price = document.createElement('td');
      price.classList.add('table__cell');
      price.textContent = `$${obj['price']}`;

      const totalPrice = document.createElement('td');
      totalPrice.classList.add('table__cell');
      totalPrice.textContent = `$${obj['price'] * obj['count']}`;

      const buttons = document.createElement('td');
      buttons.classList.add('table__cell', 'table__cell_btn-wrapper');
      const btnPic = document.createElement('button');
      btnPic.classList.add('table__btn', 'table__btn_pic');
      const btnEdit = document.createElement('button');
      btnEdit.classList.add('table__btn', 'table__btn_edit');
      const btnDel = document.createElement('button');
      btnDel.classList.add('table__btn', 'table__btn_del');
      buttons.append(btnPic, btnEdit, btnDel);

      tr.append(number, title, category, units, count, price, totalPrice, buttons);
      break;
    }
  }

  tableBody.append(tr);
};

const renderGoods = objGood => {
  if (Array.isArray(objGood)) {
    const arrGoods = objGood.map(item => createRow(item));
    createRow(...arrGoods);
  } else {
    goods.push(objGood);
    createRow(objGood);
  }
};

const tableTotalPrice = document.querySelector('.cms__total-price');
// console.log('tableTotalPrice: ', tableTotalPrice);

const tableResultPrice = objGood => {
  let totalPrice = 15500;
  objGood.map(item => (totalPrice += item.count * item.price));
  //   console.log(totalPrice);
  tableTotalPrice.textContent = `$ ${totalPrice}`;
};

tableResultPrice(goods);

const modal = document.querySelector('.modal');
const modalTitle = modal.querySelector('.modal__title');
const modalForm = modal.querySelector('.modal__form');
// console.log('modalForm: ', modalForm.count);
const modalCheckbox = modal.querySelector('.modal__checkbox');
const modalInputDiscount = modal.querySelector('.modal__input_discount');
const modalId = modal.querySelector('.vendor-code__id');
const modalTotalPrice = modal.querySelector('.modal__total-price');
modalTotalPrice.textContent = '$ 0.00';
console.log('modalId: ', modalId);

const modalCount = modalForm.count;
console.log('modalCount: ', modalCount);
const modalPrice = modalForm.price;
console.log('modalPrice: ', modalPrice);

const tableBody = document.querySelector('.table__body');
const addGoodBtn = document.querySelector('.panel__add-goods');
const modalClose = document.querySelector('.modal__close');
const overlayModal = document.querySelector('.overlay__modal');

modalCount.addEventListener('blur', () => {
  if (modalCount.value !== '' && modalPrice.value !== '') {
    modalTotalPrice.textContent = `$ ${+modalCount.value * +modalPrice.value}`;
  }
});

modalPrice.addEventListener('blur', () => {
  if (modalCount.value !== '' && modalPrice.value !== '') {
    modalTotalPrice.textContent = `$ ${+modalCount.value * +modalPrice.value}`;
  }
});

const createId = arr => {
  const randomId = Math.floor(Math.random() * 1000000000);
  arr.forEach(item => {
    if (item.id === randomId) {
      createId(arr);
    }
  });
  return randomId;
};

modalForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newGood = Object.fromEntries(formData);
  newGood['id'] = modalId.textContent;

  console.log('newGood: ', newGood);
  renderGoods(newGood);
  modalForm.reset();
  overlay.classList.remove('active');
  modalTotalPrice.textContent = '$ 0.00';
});

modalCheckbox.addEventListener('change', () => {
  if (modalInputDiscount.disabled) {
    modalInputDiscount.disabled = false;
  } else {
    modalInputDiscount.value = '';
    modalInputDiscount.disabled = true;
  }
});

addGoodBtn.addEventListener('click', () => {
  overlay.classList.add('active');
  modalId.textContent = createId(goods);
});

overlay.addEventListener('click', e => {
  const target = e.target;
  if (target === overlay || target.closest('.modal__close')) {
    overlay.classList.remove('active');
  }
});

tableBody.addEventListener('click', e => {
  const target = e.target;
  if (target.closest('.table__btn_del')) {
    goods.forEach((item, index) => {
      if (target.closest('tr').querySelector('.table__cell-id').textContent === `id: ${item.id}`) {
        goods.splice(index, 1);
      }
    });
    target.closest('tr').remove();
    // renderGoods(goods);
  }
  console.log(goods);
});

renderGoods(goods);
