import { Component, Event, EventEmitter, Prop } from "@stencil/core";
import { TableColumnSizes } from "../../../../types/table";

@Component({
	tag: "p-table-extra-header",
})
export class TableExtraHeader {
	/**
	 * The name of the column
	 */
	@Prop({ reflect: true, mutable: true }) name: string;

	/**
	 * Wether the column should be sticky (Only works on angular variant of table)
	 */
	@Prop({ reflect: true, mutable: true }) sticky: boolean | "secondary" = false;

	/**
	 * Wether the column should use the slot
	 */
	@Prop({ reflect: true, mutable: true }) useSlot: boolean = true;

	/**
	 * The alignment of the column
	 */
	@Prop({ reflect: true, mutable: true }) align: "start" | "center" | "end" =
		"start";

	/**
	 * Parsed sizes based on the complete set of columns
	 */
	@Prop({ reflect: true, mutable: true }) parsedSizes:
		| TableColumnSizes
		| undefined;

	/**
	 * The sizes of the column
	 */
	@Prop({ mutable: true }) sizes:
		| "auto"
		| "hidden"
		| "full"
		| number
		| TableColumnSizes = "auto";

	/**
	 * Event to let the table know it has to re render
	 */
	@Event({ bubbles: true, composed: true })
	tableDefinitionChanged: EventEmitter<boolean>;

	componentDidUpdate() {
		this.tableDefinitionChanged.emit(true);
	}

	render() {
		return;
	}
}
