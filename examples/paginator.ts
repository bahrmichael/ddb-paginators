// copied and adapted from https://advancedweb.hu/how-to-paginate-the-aws-js-sdk-using-async-generators
export const getPaginatedResults = async(fn) => {
    const EMPTY = Symbol("empty");
    const res = [];
    for await (const lf of (async function* () {
        let NextMarker = EMPTY;
        let count = 0;
        while (NextMarker || NextMarker === EMPTY) {
            const {marker, results, count: ct} = await fn(NextMarker !== EMPTY ? NextMarker : undefined, count);

            yield* results;

            if (!marker) {
                break;
            }

            NextMarker = marker;
            count = ct;
        }
    })()) {
        res.push(lf);
    }

    return res;
};