import IPFS from "ipfs-mini";

function ipfsClient() {
    const ipfs = new IPFS({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        }
    );
    return ipfs;
}


async function saveText() {
    let ipfs = ipfsClient();
    console.log(ipfs);
    let result = ipfs.add("welcome", (err, hash) => {
        if(err){
            console.log(err);
        }

        console.log(hash);
    });
    // console.log(result);
}
// saveText();

// async function saveFile() {

//     let ipfs = await ipfsClient();

//     let data = fs.readFileSync("./package.json")
//     let options = {
//         warpWithDirectory: false,
//         progress: (prog) => console.log(`Saved :${prog}`)
//     }
//     let result = await ipfs.add(data, options);
//     console.log(result)
// }

const Data = () => {
    saveText();
}


export async function getData(hash) {
    let ipfs = await ipfsClient();

    let asyncitr = ipfs.cat(hash)

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        console.log(data)
    }
}

export default Data;