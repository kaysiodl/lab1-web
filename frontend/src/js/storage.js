export function saveResult(result) {
    const storedData = localStorage.getItem('points');
    let results = [];

    if (storedData) {
        try {
            const parsed = JSON.parse(storedData);
            if (Array.isArray(parsed)) {
                results = parsed;
            }
        } catch (e) {
            console.log('Ошибка парсинга, создадим новый массив');
        }
    }

    results.push({
        x: result.x,
        y: result.y,
        r: result.r,
        hit: result.hit,
        currentTime: result.currentTime,
        time: result.time
    });

    localStorage.setItem('points', JSON.stringify(results));
}

