export default class BufferReader
{
	constructor(byteArray)
	{
		this.bytes = byteArray
		this.head = 0
	}
	
	
	get length()
	{
		return this.bytes.length
	}
	
	
	_at(index)
	{
		const b = this.bytes[index]
		if (b === undefined)
			throw new RangeError()
			
		return b
	}
	
	
	seek(index)
	{
		this.head = index
	}
	
	
	peekUint8()
	{
		return this._at(this.head)
	}
	
	
	readUint8()
	{
		const b = this._at(this.head)
		this.head += 1
		return b
	}
	
	
	readManyUint8(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readUint8())
		
		return arr
	}
	
	
	readUint16LE()
	{
		const b0 = this.readUint8()
		const b1 = this.readUint8()
		
		const result = (b1 << 8) | b0
		
		if (result < 0)
			return 0x10000 + result
		else
			return result
	}
	
	
	readUint16BE()
	{
		const b0 = this.readUint8()
		const b1 = this.readUint8()
		
		const result = (b0 << 8) | b1
		
		if (result < 0)
			return 0x10000 + result
		else
			return result
	}
	
	
	readManyUint16LE(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readUint16LE())
		
		return arr
	}
	
	
	readManyUint16BE(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readUint16BE())
		
		return arr
	}
	
	
	readUint32LE()
	{
		const b0 = this.readUint8()
		const b1 = this.readUint8()
		const b2 = this.readUint8()
		const b3 = this.readUint8()
		
		const result = (b3 << 24) | (b2 << 16) | (b1 << 8) | b0
		
		if (result < 0)
			return 0x100000000 + result
		else
			return result
	}
	
	
	readUint32BE()
	{
		const b0 = this.readUint8()
		const b1 = this.readUint8()
		const b2 = this.readUint8()
		const b3 = this.readUint8()
		
		const result = (b0 << 24) | (b1 << 16) | (b2 << 8) | b3
		
		if (result < 0)
			return 0x100000000 + result
		else
			return result
	}
	
	
	readManyUint32LE(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readUint32LE())
		
		return arr
	}
	
	
	readManyUint32BE(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readUint32BE())
		
		return arr
	}
	
	
	readInt8()
	{
		const x = this.readUint8()
		if ((x & 0x80) == 0)
			return x
		
		return -(0x100 - x)
	}
	
	
	readManyInt8(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readInt8())
		
		return arr
	}
	
	
	readInt16LE()
	{
		const x = this.readUint16LE()
		if ((x & 0x8000) == 0)
			return x
		
		return -(0x10000 - x)
	}
	
	
	readInt16BE()
	{
		const x = this.readUint16BE()
		if ((x & 0x8000) == 0)
			return x
		
		return -(0x10000 - x)
	}
	
	
	readManyInt16LE(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readInt16LE())
		
		return arr
	}
	
	
	readManyInt16BE(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readInt16BE())
		
		return arr
	}
	
	
	readInt32LE()
	{
		const x = this.readUint32LE()
		if ((x & 0x80000000) == 0)
			return x
		
		return -(0x100000000 - x)
	}
	
	
	readInt32BE()
	{
		const x = this.readUint32BE()
		if ((x & 0x80000000) == 0)
			return x
		
		return -(0x100000000 - x)
	}	
	
	
	readManyInt32LE(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readInt32LE())
		
		return arr
	}
	
	
	readManyInt32BE(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readInt32BE())
		
		return arr
	}
	
	
	readFloat32()
	{
		const b0 = this.readUint8()
		const b1 = this.readUint8()
		const b2 = this.readUint8()
		const b3 = this.readUint8()
		
		const buf = new ArrayBuffer(4)
		const view = new DataView(buf)

		view.setUint8(0, b0)
		view.setUint8(1, b1)
		view.setUint8(2, b2)
		view.setUint8(3, b3)

		return view.getFloat32(0)
	}
	
	
	readManyFloat32(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readFloat32())
		
		return arr
	}
	
	
	readFloat64()
	{
		const b0 = this.readUint8()
		const b1 = this.readUint8()
		const b2 = this.readUint8()
		const b3 = this.readUint8()
		const b4 = this.readUint8()
		const b5 = this.readUint8()
		const b6 = this.readUint8()
		const b7 = this.readUint8()
		
		const buf = new ArrayBuffer(8)
		const view = new DataView(buf)

		view.setUint8(0, b0)
		view.setUint8(1, b1)
		view.setUint8(2, b2)
		view.setUint8(3, b3)
		view.setUint8(4, b4)
		view.setUint8(5, b5)
		view.setUint8(6, b6)
		view.setUint8(7, b7)

		return view.getFloat64(0)
	}
	
	
	readManyFloat64(count)
	{
		let arr = []
		for (let i = 0; i < count; i++)
			arr.push(this.readFloat64())
		
		return arr
	}
	
	
	readAsciiLength(length)
	{
		let str = ""
		for (let i = 0; i < length; i++)
			str += String.fromCharCode(this.readUint8())
		
		return str
	}
	
	
	readAsciiZeroTerminated()
	{
		let str = ""
		while (true)
		{
			const c = this.readUint8()
			if (c == 0)
				break
			
			str += String.fromCharCode(c)
		}
		
		return str
	}
}