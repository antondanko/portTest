if (window.File && window.FileReader && window.FileList && window.Blob) {
	document.getElementById('file').addEventListener('change', function(e) {


		// реализация сортировки слиянием
		const merge = (arrFirst, arrSecond) => {
			const arrSort = [];
			let i = j = 0;
			while (i < arrFirst.length && j < arrSecond.length) {
					arrSort.push(
							(arrFirst[i] < arrSecond[j]) ? arrFirst[i++] : arrSecond[j++]
					);
				
			}
			return [
					...arrSort,
					...arrFirst.slice(i),
					...arrSecond.slice(j)
			];
		};

		const mergeSort = arr => {
			if (!arr || !arr.length) {
					return null;
			}
			if (arr.length <= 1) {
					return arr;
			}
			const middle = Math.floor(arr.length / 2);
			const arrLeft = arr.slice(0, middle);
			const arrRight = arr.slice(middle);
			return merge(mergeSort(arrLeft), mergeSort(arrRight));;
		};		
		
		
		const file = e.target.files[0];
		const output = document.getElementById('output');
		const reader = new FileReader();
		
		output.innerHTML = '<div class="spinner"></div>';
		
		reader.onload = e => {
			const text = e.target.result;
			const arr = text.split('\n').filter(Number);
			
			// максимальное число в файле
			const maxNum = arr => {
				let arrNum = arr.map(numStr => parseInt(numStr));
				let max = arrNum[0];
					for (let i = 0; i < arrNum.length; i++) {
						if( arrNum[i] > max) {
							max = arrNum[i];
						}					
					}
					return max;
			}

			// минимальное число в файле
			const minNum = arr => {
				let arrNum = arr.map(numStr => parseInt(numStr));
				let min = arrNum[0];
				for (let i = 0; i < arrNum.length; i++) {
					if ( arrNum[i] < min) {
						min = arrNum[i];	
					}							
				}
				return min;
			}

			// найти медиану
			const mediana = arr => {
				let arrNum = arr.map(numStr => parseInt(numStr));
				// let arrSort = arrNum.sort((a, b)=> a - b);
				let arrSort = mergeSort(arrNum);
				let mediana;
				if (arrNum.length  % 2 == 0) {
					mediana = (arrSort[Math.round((arrSort.length) / 2)] + (arrSort.length / 2)) / 2;
				} else {
					mediana = arrSort[Math.round((arrNum.length - 1) / 2)];
				}
				return mediana;
			}

			// найти среднее арифметическое значение
			const average = arr => {
				let arrNum = arr.map(numStr => parseInt(numStr));
				var sumElement = 0;
				for (let i = 0; i < arrNum.length; i++ ) {
					sumElement += arrNum[i];
				}
				return (sumElement / arrNum.length);
			}

			// найти наибольшую последовательность идущих подряд чисел, которая увеличивается
			const maxSeries = arr => {
				let arrNum = arr.map(numStr => parseInt(numStr));
				let seriesArr = [arrNum[0]];
				let tmpArr = [arrNum[0]];
				for (i = 1; i < arrNum.length; i++) {         
					if (arrNum[i] > arrNum[i-1]) {
						tmpArr.push(arrNum[i]);
					} else {
						if (tmpArr.length > seriesArr.length) {
							seriesArr = tmpArr;
						}
						tmpArr = [arrNum[i]];
					}
				}
				if (tmpArr.length > seriesArr.length) {
					seriesArr = tmpArr;
				}
				return seriesArr;
			}


			// наибольшую последовательность идущих подряд чисел, которая уменьшается
			const minSeries = arr => {
				let arrNum = arr.map(numStr => parseInt(numStr));
				let seriesArr = [arrNum[0]];
				let tmpArr = [arrNum[0]];
				for (let i = 1; i < arrNum.length; i++) {         
					if (arrNum[i] < arrNum[i-1]) {
						tmpArr.push(arrNum[i]);
					} else {
						if (tmpArr.length > seriesArr.length) {
							seriesArr = tmpArr;
						}
						tmpArr = [arrNum[i]];
					}
				}
				if (tmpArr.length > seriesArr.length) {
					seriesArr = tmpArr;
				}
				return seriesArr;
			}
	
			const maxNumResult = maxNum(arr) ? maxNum(arr) : "не найдено";
			const minNumResult = minNum(arr) ? minNum(arr) : "не найдено";
			const medianaOfFile = mediana(arr) ? mediana(arr) : "не найдена";
			const averageOfFile = average(arr) ? average(arr) : "не найдено";
			const maxSeriesIncr = maxSeries(arr).join(', ') ? maxSeries(arr).join(', ') : "не найдена";
			const maxSeriesDecr = minSeries(arr).join(', ') ? minSeries(arr).join(', ') : "не найдена";

			
			output.innerHTML = '<li>Mаксимальное число в файле: <span>' + maxNumResult + '</span></li>';
			output.innerHTML += '<li>Минимальное число в файле: <span>' + minNumResult + '</span></li>';
			output.innerHTML += '<li>Медиана: <span>' + medianaOfFile + '</li>';
			output.innerHTML += '<li>Среднее арифметическое значение: <span>' + averageOfFile + '</span></li>';
			output.innerHTML += '<li>Наибольшая последовательность идущих подряд чисел, которые увеличиваются: <span>' + maxSeriesIncr + '</span></li>';
			output.innerHTML += '<li>Наибольшая последовательность идущих подряд чисел, которые уменьшаются: <span>' + maxSeriesDecr + '</span></li>';
			
		};
		
		reader.readAsText(file);
	});
} else {
	alert('Обновите браузер до современных стандартов!');
}