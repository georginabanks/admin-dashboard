export function DatetimeStrings(props) {
	const dt = new Date(props).toUTCString().split(" ");
	
	let day;
	let date;
	let month;
	let year;
	let time;
	
	try {
		day = dt[0].slice(0, 3);
		date = dt[1];
		month = dt[2];
		year = dt[3];
		time = dt[4].slice(0, 5);
	} catch (err) { console.log(err) }

	return {
				day: day,
				date: date,
				month: month,
				year: year,
				time: time,
			}
}

export function DateString(props) {
	const strings = DatetimeStrings(props);
	
	return `${strings.date} ${strings.month} ${strings.year}`
}