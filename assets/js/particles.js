(async () => {
	await loadAll(tsParticles);

	await tsParticles.addPreset("lightdark", {
		fullScreen: {
			enable: false
		},
		particles: {
			links: {
				enable: true
			},
			move: {
				enable: true
			},
			number: {
				value: 200
			},
			opacity: {
				value: { min: 0.3, max: 1 }
			},
			shape: {
				type: ["circle", "square", "triangle", "polygon"],
				options: {
					polygon: [
						{
							sides: 5
						},
						{
							sides: 6
						},
						{
							sides: 8
						}
					]
				}
			},
			size: {
				value: { min: 1, max: 3 }
			}
		},
		interactivity: {
			events: {
				onHover: {
					/** 
					 * Enable hover interactivity 
					 */
					enable: true,
					/** 
					 * Set the mode to "repulse" (or "bubble", "grab", etc.) 
					 */
					mode: "repulse"
				},
				onClick: {
					enable: true,
					mode: "push"
				},
				resize: true
			},
			modes: {
				repulse: {
					distance: 100, // Distance of the repulse effect
					duration: 0.4
				},
				push: {
					quantity: 4
				}
			}
		},
		detectRetina: true
	});

	await tsParticles.load({
		id: "light",
		options: {
			preset: "lightdark",
			particles: {
				// color: {
				// 	value: "#2D336B"
				// },
				// links: {
				// 	color: "#2D336B"
				// }
				color: {
					value: "#1e2430"
				},
				links: {
					color: "#1e2430"
				}
			},
			responsive: [
				{
					maxWidth: 992, // Target mobile/tablet
					options: {
						particles: {
							number: { value: 50 } // Reduce particle count for performance
						}
					}
				}
			]
		}
	});

	await tsParticles.load({
		id: "dark",
		options: {
			preset: "lightdark",
			particles: {
				color: {
					value: "#E0FFFF"
				},
				links: {
					color: "#E0FFFF"
				}
			}
		},
		responsive: [
			{
				maxWidth: 992, // Target mobile/tablet
				options: {
					particles: {
						number: { value: 50 } // Reduce particle count for performance
					}
				}
			}
		]
	});
})();