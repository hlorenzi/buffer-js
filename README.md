# buffer

Utilities for working with buffers in JS.  
Currently features a simple buffer reader that reads from an unsigned byte array,
while automatically advancing the read head and allowing seeks.

Install with: `npm install @hlorenzi/buffer`

## Example

```js
import { BufferReader } from "@hlorenzi/buffer"

const arr = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]
const buf = new BufferReader(arr)

console.log(buf.readUint8())    // 0x01
console.log(buf.readUint8())    // 0x23
console.log(buf.readUint16BE()) // 0x4567
console.log(buf.readUint32BE()) // 0x89abcdef
```

## API

```js
new BufferReader(byteArray)

// Properties
BufferReader#length
BufferReader#head

// Read head manipulation
BufferReader#seek(byteIndex)

// Peek without advancing the read head
BufferReader#peekUint8()

// Read unsigned
BufferReader#readUint8()
BufferReader#readUint16LE()
BufferReader#readUint16BE()
BufferReader#readUint32LE()
BufferReader#readUint32BE()

// Read two's complement signed
BufferReader#readInt8()
BufferReader#readInt16LE()
BufferReader#readInt16BE()
BufferReader#readInt32LE()
BufferReader#readInt32BE()

// Read multiple unsigned into an array
BufferReader#readManyUint8(count)
BufferReader#readManyUint16LE(count)
BufferReader#readManyUint16BE(count)
BufferReader#readManyUint32LE(count)
BufferReader#readManyUint32BE(count)

// Read multiple two's complement signed into an array
BufferReader#readManyInt8(count)
BufferReader#readManyInt16LE(count)
BufferReader#readManyInt16BE(count)
BufferReader#readManyInt32LE(count)
BufferReader#readManyInt32BE(count)

// Read floats
BufferReader#readFloat32()
BufferReader#readFloat64()

// Read multiple floats into an array
BufferReader#readManyFloat32(count)
BufferReader#readManyFloat64(count)

// Read ASCII-encoded strings
BufferReader#readAsciiLength(lengthInBytes)
BufferReader#readAsciiZeroTerminated()

// Read UTF-16-encoded strings
BufferReader#readUtf16LELength(lengthIn16BitUnits)
BufferReader#readUtf16BELength(lengthIn16BitUnits)
```