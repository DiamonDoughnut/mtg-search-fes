import { cn, formats } from "@/lib/utils";
import TagSearch, { Tags } from "../tag-search";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sets, Symbols, Types } from "@/lib/tags";
import ColorCheckbox from "../color-checkbox";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import RarityCheckbox from "../rarity-checkbox";
import LanguageSelect from "../language-selector";
import { Checkbox } from "../ui/checkbox";
import * as scryfall from 'scryfall-api'
import SubmitButton from "../submit-button";

export default function AdvancedSearchForm() {
  const isDesktop = window.innerWidth > 797;
  const [typeTags, setTypeTags] = useState<Tags[]>();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [white, setWhite] = useState(false);
  const [blue, setBlue] = useState(false);
  const [black, setBlack] = useState(false);
  const [red, setRed] = useState(false);
  const [green, setGreen] = useState(false);
  const [colorless, setColorless] = useState(false);
  const [colorOp, setColorOp] = useState<string>(":");
  const [whiteId, setWhiteId] = useState(false);
  const [blueId, setBlueId] = useState(false);
  const [blackId, setBlackId] = useState(false);
  const [redId, setRedId] = useState(false);
  const [greenId, setGreenId] = useState(false);
  const [colorlessId, setColorlessId] = useState(false);
  const [manaCost, setManaCost] = useState("");
  const [manaOpen, setManaOpen] = useState(false);
  const [statSelect, setStatSelect] = useState("mana");
  const [statOp, setStatOp] = useState("equal");
  const [statVal, setStatVal] = useState("");
  const [paper, setPaper] = useState(true);
  const [arena, setArena] = useState(false);
  const [online, setOnline] = useState(false);
  const [legality, setLegality] = useState("legal");
  const [format, setFormat] = useState("");
  const [setTags, setSetTags] = useState<Tags[]>();
  const [common, setCommon] = useState(false);
  const [uncommon, setUncommon] = useState(false);
  const [rare, setRare] = useState(false);
  const [mythic, setMythic] = useState(false);
  const [lore, setLore] = useState("");
  const [lang, setLang] = useState("");
  const [sort, setSort] = useState<scryfall.CardSearchOrder>("name");
  const [allPrints, setAllPrints] = useState(false);
  const [extras, setExtras] = useState(false);
  

  return (
    <div className='flex h-full w-full'>
      <div className={cn("grid items-start gap-4 w-full")}>
        <div className='mb-2 grid gap-2'>
          <Label
            className='pt-4 font-bold text-2xl border-t-black border-t-2'
            htmlFor='name'
          >
            Card Name
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            id='name'
            placeholder='Card Name - Exact match unnecessary'
          />
        </div>
        <div className='mb-2 grid gap-2'>
          <Label
            className='pt-4 font-bold text-2xl border-t-black border-t-2'
            htmlFor='text'
          >
            Text
          </Label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            id='text'
            type='text'
            placeholder='Any text in the card rules block - order of words does not matter'
          />
        </div>
        <div className='grid gap-2' id='types'>
          <Label className='font-bold text-2xl border-t-black border-t-2'>
            TypeLine
          </Label>
          <TagSearch
            value={typeTags || []}
            data={Types}
            section='types'
            setValue={setTypeTags}
          ></TagSearch>
        </div>
        <div className='mb-2 grid gap-2'>
          <Label
            className='pt-4 font-bold text-2xl border-t-black border-t-2'
            htmlFor='color'
          >
            Color
          </Label>
          <div
            id='color'
            className={cn(
              "flex justify-center items-center flex-wrap gap-x-4",
              !isDesktop && "flex-col gap-y-4 items-start justify-start"
            )}
          >
            <ColorCheckbox
              color='White'
              state={white}
              setState={(arg) => {
                setWhite(arg)
                if (arg) {
                  setColorless(false)
                }
              }}
            />
            <ColorCheckbox
              color='Blue'
              state={blue}
              setState={(arg) => {
                setBlue(arg)
                if (arg) {
                  setColorless(false)
                }
              }}
            />
            <ColorCheckbox
              color='Black'
              state={black}
              setState={(arg) => {
                setBlack(arg)
                if (arg) {
                  setColorless(false)
                }
              }}
            />
            <ColorCheckbox
              color='Red'
              state={red}
              setState={(arg) => {
                setRed(arg)
                if (arg) {
                  setColorless(false)
                }
              }}
            />
            <ColorCheckbox
              color='Green'
              state={green}
              setState={(arg) => {
                setGreen(arg)
                if (arg) {
                  setColorless(false)
                }
              }}
            />
            <ColorCheckbox
              color='Colorless'
              state={colorless}
              setState={(arg) => {
                setColorless(arg)
                if (arg) {
                  setWhite(false)
                  setBlue(false)
                  setBlack(false)
                  setRed(false)
                  setGreen(false)
                }
              }}
            />
          </div>
          <Select
            onValueChange={(val) => setColorOp(val === 'exact' ? ':' : val === 'at least' ? '>=' : '-')}
            defaultValue='exact'
          >
            <SelectTrigger className='w-1/3 ml-8 mt-2'>
              <SelectValue />
            </SelectTrigger>
            <h4 className='italic text-slate-500 text-wrap ml-8'>
              {colorOp === "exact"
                ? "Matching cards with EXACTLY these colors ONLY in their cost"
                : colorOp === "atLeast"
                ? "Matching cards guaranteed with these colors in their cost, but potentially with more"
                : "Matching cards that DO NOT have these colors in their cost"}
            </h4>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='exact'>Exactly These</SelectItem>
                <SelectItem value='atLeast'>At Least These</SelectItem>
                <SelectItem value='none'>None of These</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='mb-2 grid gap-2'>
          <Label
            className='pt-4 font-bold text-2xl border-t-black border-t-2'
            htmlFor='color'
          >
            Commander
          </Label>
          <div
            id='commander'
            className={cn(
              "flex justify-center items-center flex-wrap gap-x-4",
              !isDesktop && "flex-col gap-y-4 items-start justify-start"
            )}
          >
            <ColorCheckbox
              color='White'
              state={whiteId}
              setState={(arg) => {
                setWhiteId(arg)
                if (arg) {
                  setColorlessId(false)
                }
              }}
            />
            <ColorCheckbox
              color='Blue'
              state={blueId}
              setState={(arg) => {
                setBlueId(arg)
                if (arg) {
                  setColorlessId(false)
                }
              }}
            />
            <ColorCheckbox
              color='Black'
              state={blackId}
              setState={(arg) => {
                setBlackId(arg)
                if (arg) {
                  setColorlessId(false)
                }
              }}
            />
            <ColorCheckbox
              color='Red'
              state={redId}
              setState={(arg) => {
                setRedId(arg)
                if (arg) {
                  setColorlessId(false)
                }
              }}
            />
            <ColorCheckbox
              color='Green'
              state={greenId}
              setState={(arg) => {
                setGreenId(arg)
                if (arg) {
                  setColorlessId(false)
                }
              }}
            />
            <ColorCheckbox
              color='Colorless'
              state={colorlessId}
              setState={(arg) => {
                setColorlessId(arg)
                if (arg) {
                  setWhiteId(false)
                  setBlueId(false)
                  setBlackId(false)
                  setRedId(false)
                  setGreenId(false)
                }
              }}
            />
          </div>
        </div>
        <div className='mb-2 grid gap-2'>
          <Label
            className='pt-4 font-bold text-2xl border-t-black border-t-2'
            htmlFor='manaCost'
          >
            {" "}
            Mana Cost{" "}
          </Label>
          <div
            id='manaCost'
            className='flex justify-start gap-x-4 w-2/3 ml-8'
          >
            <Input
              value={manaCost}
              onChange={(e) => setManaCost(e.target.value)}
              placeholder="Any Mana Symbols (e.g. '{W}{W}'"
            />
            <Popover
              open={manaOpen}
              onOpenChange={setManaOpen}
            >
              <PopoverTrigger asChild>
                <Button className='bg-violet-300 text-slate-800 font-bold border-2 border-violet-600 hover:bg-violet-600'>
                  Add a Mana Symbol
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-full flex flex-col h-80 gap-4 overflow-y-scroll'>
                {Symbols.filter((symbol) => symbol.category === "mana").map(
                  (symbol) => (
                    <div
                      className='text-md p-2'
                      key={symbol.value}
                      onClick={() => {
                        setManaOpen(false);
                        setManaCost((prev) => prev + symbol.value);
                      }}
                    >
                      <span className='font-bold p-l-2 p-r-4'>
                        {symbol.value}
                      </span>{" "}
                      -{" "}
                      <span className='italic text-opacity-75'>
                        {symbol.label}
                      </span>
                    </div>
                  )
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className='mb-2 grid gap-2'>
          <Label
            className='pt-4 font-bold text-2xl border-t-black border-t-2'
            htmlFor='stats'
          >
            {" "}
            Stats{" "}
          </Label>
          <div
            id='stats'
            className='flex gap-x-4 w-fit min-w-80 ml-8'
          >
            <Select
              value={statSelect}
              onValueChange={setStatSelect}
            >
              <SelectTrigger className='flex items-center relative w-64'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    value='mana'
                    className='flex items-center justify-start relative'
                  >
                    <i className='ms ms-fw ms-c absolute left-5 top-2 h-full w-10' />
                    <span className='ml-10'>Converted Mana Cost</span>
                  </SelectItem>
                  <SelectItem
                    value='power'
                    className='flex items-center justify-start relative'
                  >
                    <i className='ms ms-fw ms-power absolute left-6 top-2 h-full w-10' />
                    <span className='ml-10'>Power</span>
                  </SelectItem>
                  <SelectItem
                    value='toughness'
                    className='flex items-center justify-start relative'
                  >
                    <i className='ms ms-fw ms-toughness absolute left-6 top-2 h-full w-10' />
                    <span className='ml-10'>Toughness</span>
                  </SelectItem>
                  <SelectItem
                    value='loyalty'
                    className='flex items-center justify-start relative'
                  >
                    <i className='ms ms-fw ms-loyalty-start absolute left-0 top-0 h-full w-10 ' />
                    <span className='ml-3'>Loyalty</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={statOp}
              onValueChange={setStatOp}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='equal'>equal to</SelectItem>
                  <SelectItem value='less'>less than</SelectItem>
                  <SelectItem value='greater'>greater than</SelectItem>
                  <SelectItem value='lessEqual'>
                    less than or equal to
                  </SelectItem>
                  <SelectItem value='greaterEqual'>
                    greater than or equal to
                  </SelectItem>
                  <SelectItem value='not'>not equal to</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              value={statVal}
              onChange={(e) => setStatVal(e.target.value)}
              placeholder="any value, such as '2'"
            />
          </div>
        </div>
        <div className='mb-2 grid gap-2'>
          <Label
            className='pt-4 font-bold text-2xl border-t-black border-t-2'
            htmlFor='game'
          >
            Game Type
          </Label>
          <div
            id='game'
            className='flex gap-x-4 w-fit min-w-80 ml-8'
          >
            <div className='paper flex justify-center items-center gap-x-4'>
              <input
                type='checkbox'
                className="h-4 w-4"
                defaultChecked={paper}
                value={"paper"}
                onChange={(checked) => setPaper(checked.target.checked)}
              />
              <Label>Paper</Label>
            </div>
            <div className='arena flex justify-center items-center gap-x-4'>
              <input
                type='checkbox'
                className="h-4 w-4"
                defaultChecked={arena}
                value={"arena"}
                onChange={(checked) => setArena(checked.target.checked)}
              />
              <Label>Arena</Label>
            </div>
            <div className='online flex justify-center items-center gap-x-4'>
              <input
                type='checkbox'
                className="h-4 w-4"
                defaultChecked={online}
                value={"online"}
                onChange={(checked) => setOnline(checked.target.checked)}
              />
              <Label>MTG Online</Label>
            </div>
          </div>
        </div>
        <div className="mb-2 grid gap-2">
          <Label
            className='pt-4 font-bold text-2xl border-t-black border-t-2'
            htmlFor='legality'
          >
            Format Legality
          </Label>
          <div id="legality" className="flex gap-x-4 w-fit min-w-80 ml-8">
            <Select onValueChange={setLegality} defaultValue="legal" value={legality}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="legal">
                    Legal
                  </SelectItem>
                  <SelectItem value="restricted">
                    Restricted
                  </SelectItem>
                  <SelectItem value="banned">
                    Banned
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={setFormat} defaultValue={formats[0].value} value={format}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {formats.map((format) => (
                    <SelectItem value={format.value} key={format.value}>{format.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-2 grid gap-2">
          <Label className="pt-4 font-bold text-2xl border-t-black border-t-2" htmlFor="sets">
            Set
          </Label>
          <div id="sets" className="flex gap-x-4 w-full">
            <TagSearch value={setTags || []} data={Sets} section="sets" setValue={setSetTags} />         </div>
        </div>
        <div className="mb-2 grid gap-2">
          <Label
            className="pt-4 font-bold text-2xl border-t-black border-t-2"
            htmlFor="rarity"
          >
            Rarity
          </Label>
          <div id="rarity" className="flex gap-x-4 w-full justify-center">
            <RarityCheckbox rarity="common" state={common} setState={setCommon} />
            <RarityCheckbox rarity="uncommon" state={uncommon} setState={setUncommon} />
            <RarityCheckbox rarity="rare" state={rare} setState={setRare} />
            <RarityCheckbox rarity="mythic" state={mythic} setState={setMythic} />
          </div>
        </div>
        <div className="mb-2 grid gap-2">
          <Label
            className="pt-4 font-bold text-2xl border-t-black border-t-2"
            htmlFor="lore"
          >
            Card Lore
          </Label>
          <div id="lore" className="flex gap-x-4 w-2/3 ml-8">
            <Input value={lore} onChange={(e) => setLore(e.target.value)} placeholder="Any text - Best results with names (e.g. 'Jhoira')" />  
          </div>
        </div>
        <div className="mb-2 grid gap-2">
          <Label
            className="pt-4 font-bold text-2xl border-t-black border-t-2"
            htmlFor="language"
          >
            Language
          </Label>
          <div id="language" className="flex gap-x-4 w-2/3 ml-8">
            <LanguageSelect lang={lang} setLang={setLang} />      
          </div>
        </div>
        <div className="mb-2 grid gap-2">
          <Label
            className="pt-4 font-bold text-2xl border-t-black border-t-2"
            htmlFor="options"
          >
            Options
          </Label>
          <div id="options" className="flex flex-col gap-y-4 w-2/3 ml-8">
              <Select value={sort} onValueChange={(val) => setSort(val as scryfall.CardSearchOrder)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="name">Sort By Name</SelectItem>
                      <SelectItem value="date">Sort By Release Date</SelectItem>
                      <SelectItem value="set">Sort By Set/Number</SelectItem>
                      <SelectItem value="rarity">Sort By Rarity</SelectItem>
                      <SelectItem value="color">Sort By Color</SelectItem>
                      <SelectItem value="cmc">Sort By Mana Cost</SelectItem>
                      <SelectItem value="power">Sort By Power</SelectItem>
                      <SelectItem value="toughness">Sort By Toughness</SelectItem>
                      <SelectItem value="edhrec">Sort By EDHREC Rank</SelectItem>
                      <SelectItem value="review">Sort By Set Review</SelectItem>
                    </SelectGroup>
                  </SelectContent>
              </Select> 
              <div className="flex justify-start items-center gap-x-2">
              <Checkbox defaultChecked={allPrints} onCheckedChange={(e) => e !== 'indeterminate' ? setAllPrints(e) : setAllPrints(false)} />
              <Label className="text-lg">Show All Card Prints</Label>    
              </div>   
              <div className="flex justify-start items-center gap-x-2">
              <Checkbox defaultChecked={extras} onCheckedChange={(e) => e !== 'indeterminate' ? setExtras(e) : setExtras(false)} />
              <Label className="text-lg">Include Extras</Label>    
              </div>   
          </div>
        </div>
        <SubmitButton 
          name={name}
          text={text}
          types={typeTags}
          white={white}
          blue={blue}
          black={black}
          red={red}
          green={green}
          colorless={colorless}
          colorOp={colorOp}
          whiteId={whiteId}
          blueId={blueId}
          blackId={blackId}
          redId={redId}
          greenId={greenId}
          colorlessId={colorlessId}
          cost={manaCost}
          statSelect={statSelect}
          statOp={statOp}
          statVal={statVal}
          paper={paper}
          arena={arena}
          online={online}
          legality={legality}
          format={format}
          sets={setTags}
          common={common}
          uncommon={uncommon}
          rare={rare}
          mythic={mythic}
          lore={lore}
          language={lang}
          sort={sort}
          allPrints={allPrints}
          extras={extras}
          />
      </div>
    </div>
  );
}
