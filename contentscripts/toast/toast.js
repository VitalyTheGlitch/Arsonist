class Toast {
	static toastbox;

	static createToastBox() {
		const element = document.createElement('div');

		element.classList.add('toastbox');

		document.body.appendChild(element);

		Toast.toastbox = element;
	}

	static showToast(status, content) {
		try {
			if (!Toast.toastbox) Toast.createToastBox();

			const element = document.createElement('div');

			element.classList.add('toast');
			element.innerHTML = '<i class="fa-solid fa-circle-info"></i><span>' + content + '</span>';

			switch (status) {
				case 'success':
					element.classList.add('success');
          
					break;

				case 'info':
					element.classList.add('info');

					break;

				case 'error':
					element.classList.add('error');

					break;

				default:
					break;
			}

			Toast.toastbox.appendChild(element);

			setTimeout(() => {
				element.classList.add('out');

				setTimeout(() => element.remove(), 500);
			}, 10000);
		} catch (e) {
			console.error('Toast error:', e);
		}
	}
}
