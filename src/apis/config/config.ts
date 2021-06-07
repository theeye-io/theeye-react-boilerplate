const defaultConfigs = {
	api: {
		gateway: 'https://app.theeye.io/api',
		core: 'https://supervisor.theeye.io'
	}
}

export default (() => {
	// let configs // FIXME: De dónde sale esto?
	/* if(window && window.configs) FIXME: Property 'configs' does not exist on type 'Window & typeof globalThis'
		return Object.assign({}, defaultConfigs, window.configs);
	else */ // TODO: Implementar esto
	return defaultConfigs
})()
