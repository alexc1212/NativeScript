import { EventData } from "tns-core-modules/ui/page";
import { Button } from "tns-core-modules/ui/button";

export function onNavigate(args: EventData) {
    const button = <Button>args.object;
    button.page.frame.navigate("still-other-page/still-other-page");
}
