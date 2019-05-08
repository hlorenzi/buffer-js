import assert from "assert"
import { BufferReader } from "./index"


{
	const arr = [0x00, 0x01, 0xff]
	
	{
		const r = new BufferReader(arr)
		assert.equal(0x00, r.readUint8())
		assert.equal(0x01, r.readUint8())
		assert.equal(0xff, r.readUint8())
		assert.throws(() => r.readUint8())
	}
	
	{
		const r = new BufferReader(arr)
		r.seek(-1)
		assert.throws(() => r.readUint8())
	}
		
	{
		const r = new BufferReader(arr)
		assert.equal(0x00, r.peekUint8())
		assert.equal(0x00, r.peekUint8())
		assert.equal(0x00, r.readUint8())
		assert.equal(0x01, r.peekUint8())
		assert.equal(0x01, r.peekUint8())
		assert.equal(0x01, r.readUint8())
		assert.equal(0xff, r.peekUint8())
		assert.equal(0xff, r.peekUint8())
		assert.equal(0xff, r.readUint8())
		assert.throws(() => r.peekUint8())
		assert.throws(() => r.readUint8())
	}
	
	{
		const r = new BufferReader(arr)
		assert.equal( 0x00, r.readInt8())
		assert.equal( 0x01, r.readInt8())
		assert.equal(-0x01, r.readInt8())
		assert.throws(() => r.readInt8())
	}
}

{
	const arr = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]
	
	{
		const r = new BufferReader(arr)
		assert.equal(0x01, r.readUint8())
		assert.equal(0x23, r.readUint8())
		assert.equal(0x45, r.readUint8())
		assert.equal(0x67, r.readUint8())
		assert.equal(0x89, r.readUint8())
		assert.equal(0xab, r.readUint8())
		assert.equal(0xcd, r.readUint8())
		assert.equal(0xef, r.readUint8())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal(0x0123, r.readUint16BE())
		assert.equal(0x4567, r.readUint16BE())
		assert.equal(0x89ab, r.readUint16BE())
		assert.equal(0xcdef, r.readUint16BE())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal(0x2301, r.readUint16LE())
		assert.equal(0x6745, r.readUint16LE())
		assert.equal(0xab89, r.readUint16LE())
		assert.equal(0xefcd, r.readUint16LE())
		assert.throws(() => r.readUint8())
		
		r.seek(1)
		assert.equal(0x2345, r.readUint16BE())
		assert.equal(0x6789, r.readUint16BE())
		assert.equal(0xabcd, r.readUint16BE())
		assert.throws(() => r.readUint16BE())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal(0x01234567, r.readUint32BE())
		assert.equal(0x89abcdef, r.readUint32BE())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal(0x67452301, r.readUint32LE())
		assert.equal(0xefcdab89, r.readUint32LE())
		assert.throws(() => r.readUint8())
		
		r.seek(1)
		assert.equal(0x23456789, r.readUint32BE())
		assert.throws(() => r.readUint32BE())
		assert.throws(() => r.readUint8())
		
		r.seek(2)
		assert.equal(0x456789ab, r.readUint32BE())
		assert.throws(() => r.readUint32BE())
		assert.throws(() => r.readUint8())
		
		r.seek(2)
		assert.equal(0x456789ab, r.readUint32BE())
		assert.equal(0xcdef, r.readUint16BE())
		assert.throws(() => r.readUint8())
		
		r.seek(3)
		assert.equal(0x6789abcd, r.readUint32BE())
		assert.throws(() => r.readUint32BE())
		assert.throws(() => r.readUint8())
		
		r.seek(4)
		assert.equal(0x89abcdef, r.readUint32BE())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual(arr, r.readManyUint8(8))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([0x0123, 0x4567, 0x89ab, 0xcdef], r.readManyUint16BE(4))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([0x2301, 0x6745, 0xab89, 0xefcd], r.readManyUint16LE(4))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([0x01234567, 0x89abcdef], r.readManyUint32BE(2))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([0x67452301, 0xefcdab89], r.readManyUint32LE(2))
		assert.throws(() => r.readUint8())
	}
	
	{
		const r = new BufferReader(arr)
		assert.equal( 0x01, r.readInt8())
		assert.equal( 0x23, r.readInt8())
		assert.equal( 0x45, r.readInt8())
		assert.equal( 0x67, r.readInt8())
		assert.equal(-0x77, r.readInt8())
		assert.equal(-0x55, r.readInt8())
		assert.equal(-0x33, r.readInt8())
		assert.equal(-0x11, r.readInt8())
		assert.throws(() => r.readInt8())
		
		r.seek(0)
		assert.equal( 0x0123, r.readInt16BE())
		assert.equal( 0x4567, r.readInt16BE())
		assert.equal(-0x7655, r.readInt16BE())
		assert.equal(-0x3211, r.readInt16BE())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal( 0x2301, r.readInt16LE())
		assert.equal( 0x6745, r.readInt16LE())
		assert.equal(-0x5477, r.readInt16LE())
		assert.equal(-0x1033, r.readInt16LE())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal( 0x01234567, r.readInt32BE())
		assert.equal(-0x76543211, r.readInt32BE())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal( 0x67452301, r.readInt32LE())
		assert.equal(-0x10325477, r.readInt32LE())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([0x01, 0x23, 0x45, 0x67, -0x77, -0x55, -0x33, -0x11], r.readManyInt8(8))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([0x0123, 0x4567, -0x7655, -0x3211], r.readManyInt16BE(4))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([0x2301, 0x6745, -0x5477, -0x1033], r.readManyInt16LE(4))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([0x01234567, -0x76543211], r.readManyInt32BE(2))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([0x67452301, -0x10325477], r.readManyInt32LE(2))
		assert.throws(() => r.readUint8())
	}
}

{
	const arr = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
	
	{
		const r = new BufferReader(arr)
		assert.equal(0, r.readFloat32())
		assert.equal(0, r.readFloat32())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal(0, r.readFloat64())
		assert.throws(() => r.readUint8())
	}
}

{
	const arr = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
	
	{
		const r = new BufferReader(arr)
		assert.ok(isNaN(r.readFloat32()))
		assert.ok(isNaN(r.readFloat32()))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.ok(isNaN(r.readFloat64()))
		assert.throws(() => r.readUint8())
	}
}

{
	const arr = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0x89, 0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67]
	
	{
		const r = new BufferReader(arr)
		assert.equal( 2.9988165487136453e-38, r.readFloat32())
		assert.equal(-4.1360411582155290e-33, r.readFloat32())
		assert.equal(-4.1360411582155290e-33, r.readFloat32())
		assert.equal( 2.9988165487136453e-38, r.readFloat32())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([2.9988165487136453e-38, -4.1360411582155290e-33, -4.1360411582155290e-33, 2.9988165487136453e-38], r.readManyFloat32(4))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal( 3.5127005640885040e-303, r.readFloat64())
		assert.equal(-4.4149699613110906e-262, r.readFloat64())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.deepEqual([3.5127005640885040e-303, -4.4149699613110906e-262], r.readManyFloat64(2))
		assert.throws(() => r.readUint8())
	}
}

{
	const arr = [0x61, 0x62, 0x63, 0x64, 0x00]
	
	{
		const r = new BufferReader(arr)
		assert.equal("abcd", r.readAsciiLength(4))
		assert.equal(0x00, r.readUint8())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal("abc", r.readAsciiLength(3))
		assert.equal("d", r.readAsciiLength(1))
		assert.equal("\0", r.readAsciiLength(1))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal("abcd\0", r.readAsciiLength(5))
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.throws(() => r.readAsciiLength(6))
		
		r.seek(0)
		assert.equal("abcd", r.readAsciiZeroTerminated())
		assert.throws(() => r.readUint8())
		
		r.seek(1)
		assert.equal("bcd", r.readAsciiZeroTerminated())
		assert.throws(() => r.readUint8())
		
		r.seek(4)
		assert.equal("", r.readAsciiZeroTerminated())
		assert.throws(() => r.readUint8())
		
		r.seek(5)
		assert.throws(() => r.readAsciiZeroTerminated())
	}
}

{	
	const arr = [0x61, 0x62, 0x63, 0x64]
	
	{
		const r = new BufferReader(arr)
		assert.throws(() => r.readAsciiZeroTerminated())
	}
}

{	
	const arr = [0xb0, 0xc0, 0xd0, 0xe0, 0xf0, 0x00]
	
	{
		const r = new BufferReader(arr)
		assert.equal("\u00b0\u00c0\u00d0\u00e0\u00f0", r.readAsciiLength(5))
		assert.equal(0x00, r.readUint8())
		assert.throws(() => r.readUint8())
		
		r.seek(0)
		assert.equal("\u00b0\u00c0\u00d0\u00e0\u00f0", r.readAsciiZeroTerminated())
		assert.throws(() => r.readUint8())
	}
}