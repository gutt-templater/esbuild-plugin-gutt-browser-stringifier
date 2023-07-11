import path from 'node:path'
import fs from 'node:fs'
import esbuild from 'esbuild'
import gutt from 'gutt'
import stringifier from 'gutt-browser-stringifier'

const guttPlugin = {
	name: 'gutt',
	setup(build) {
		build.onLoad({ filter: /\.gutt$/ }, async (args) => {
			const source = await fs.promises.readFile(args.path, 'utf8')
			const filename = path.relative(process.cwd(), args.path)

			try {
				const ast = gutt.parse(source)
				const contents = stringifier(ast.result, ast.source)

				return { contents }
			} catch (exception) {
				console.error('exception', exception)
				return { errors: [] }
			}
		})
	}
}

export default guttPlugin
