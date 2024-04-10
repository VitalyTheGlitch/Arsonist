class Toast {
	static toastbox;

	static createToastBox() {
		const _0x22671c = document.createElement('div');
		_0x22671c.classList.add('toastbox');

		document.body.appendChild(_0x22671c);
		Toast.toastbox = _0x22671c;
	}

	static showToast(_0x224acf, _0x94c0e2) {
		try {
			if (!Toast.toastbox) Toast.createToastBox();

			const _0x2cd3a8 = document.createElement('div');

			_0x2cd3a8.classList.add('toast');
			_0x2cd3a8.innerHTML = '<i class="fa-solid fa-circle-info"></i><span>' + _0x94c0e2 + '</span>';

			switch (_0x224acf) {
				case 'success':
					_0x2cd3a8.classList.add('success');
          
					break;

				case 'info':
					_0x2cd3a8.classList.add('info');

					break;

				case 'error':
					_0x2cd3a8.classList.add('error');

					break;

				default:
					break;
			}

			Toast.toastbox.appendChild(_0x2cd3a8);

			setTimeout(() => {
				_0x2cd3a8.classList.add('out');

				setTimeout(() => {
					_0x2cd3a8.remove();
				}, 0x1f4);
			}, 0x2710);
		} catch (e) {
			console.error('Toast error:', e);
		}
	}
}
