var vm = new Vue({
    el: '#app',
    data: {
        bill: '',
        tip: '',
        numberOfPeople: '',
        tipAmount: 0,
        total: 0
    },
    methods: {
        setTip(e) {
            this.tip = parseInt(e.target.textContent) || parseInt(e.target.value);
            document.querySelectorAll('.tips span').forEach(element => {
                element.classList.remove('active');
            });
            e.target.classList.add('active');
            if (e.target.id === 'custom-tip') {
                e.target.classList.remove('active');
            }
        },
        setBill(e) {
            this.bill = e.target.value.replace(/[^\d.]/, '');
        },
        setPeopleCount(e) {
            this.numberOfPeople = e.target.value.replace(/[^\d]/, '');

            if (this.numberOfPeople > 0) {
                e.target.style.border = 'none';
                document.querySelector('#zero-customer-warning').style.display = 'none';
            } else {
                e.target.style.border = '2px solid #da1414';
                document.querySelector('#zero-customer-warning').style.display = 'block';
            }
        },
        resetCalculator() {
            this.bill = '';
            this.tip = '';
            this.numberOfPeople = '';
            this.tipAmount = 0;
            this.total = 0;
        }
    },
    watch: {
        bill(val) {
            if (this.numberOfPeople > 0 && this.tip > 0) {
                this.tipAmount = (val / this.numberOfPeople) * (this.tip / 100);
                this.total = (val / this.numberOfPeople) + this.tipAmount;
            }
        },
        tip(val) {
            if (this.numberOfPeople > 0 && this.bill > 0) {
                this.tipAmount = (this.bill / this.numberOfPeople) * (val / 100);
                this.total = (this.bill / this.numberOfPeople) + this.tipAmount;
            }
        },
        numberOfPeople(val) {
            if (this.bill > 0 && this.tip > 0) {
                this.tipAmount = (this.bill / val) * (this.tip / 100);
                this.total = (this.bill / val) + this.tipAmount;
            }
        }

    }
});