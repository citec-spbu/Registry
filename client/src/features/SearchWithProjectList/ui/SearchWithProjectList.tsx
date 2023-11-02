"use client";
import { FC, useRef } from "react";
import {
  DetailedProjectFilters,
  ProjectFilters,
  ProjectFiltersSmall,
  useFilters,
} from "@/entities/ProjectFilters";
import { IProject } from "@/entities/Project";
import { ITag } from "@/entities/Tag";
import { Transition } from "react-transition-group";
import { Container, LoadingCircle } from "@/shared/ui";
import { useFixedFilters } from "../hooks/useFixedFilters";
import { useRefHeight } from "@/shared/hooks";
import { useFixedHeaderTransitionStyles } from "../hooks/useFixedFiltersTransitionStyles";
import useProjectsQuery from "../hooks/useProjectsQuery";
import {
  IProjectsWithTags,
  ProjectsWithTagsListLarge,
} from "@/composites/ProjectsWithTags";

interface SearchWithProjectListProps {
  initialData: IProjectsWithTags;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

/*
      <Transition in={shouldRenderFixedHeader} timeout={300}>
        {(state) => (
          <div
            className="fixed left-0 right-0 z-[1000]"
            style={{
              ...defaultStyles,
              ...transitionStyles[state],
            }}
          >
            <div
              ref={filtersSmallRef}
              className="relative z-10 w-full bg-[#e0efef] py-3 backdrop-blur-[12px]"
            >
              <Container className="px-8">
                <div className="md:-ml-12 md:-mr-12 xl:ml-0 xl:mr-0">
                  <ProjectFiltersSmall
                    filters={filters}
                    onConfirm={setFilters}
                  />
                </div>
              </Container>
            </div>
          </div>
        )}
      </Transition>

*/

/*
<DetailedProjectFilters />
*/

const SearchWithProjectList: FC<SearchWithProjectListProps> = ({
  initialData,
  searchParams,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useFilters(searchParams);

  const filtersSmallRef = useRef<HTMLDivElement>(null);
  const filtersSmallHeight = useRefHeight(filtersSmallRef, 250);

  const { data: projectData, isLoading } = useProjectsQuery(
    filters,
    initialData,
  );

  const {
    isRefVisible: areFiltersVisible,
    shouldRender: shouldRenderFixedHeader,
  } = useFixedFilters(ref);

  const { defaultStyles, transitionStyles } = useFixedHeaderTransitionStyles(
    filtersSmallHeight,
    areFiltersVisible,
  );

  return (
    <>
      <div
        ref={ref}
        className="relative z-10 rounded-2xl bg-[#e0efef] px-8 py-6 backdrop-blur-[12px] sm:pb-14 sm:pt-12 md:-ml-12 md:-mr-12 xl:ml-0 xl:mr-0"
      >
        <ProjectFilters
          filters={filters}
          onConfirm={setFilters}
          dynamic={true}
        />
      </div>
      <div className="pt-10" />
      <div className="border-b border-black pt-5" />
      {(!projectData || isLoading) && <LoadingCircle />}
      {projectData && <ProjectsWithTagsListLarge projectData={projectData} />}
    </>
  );
};

export default SearchWithProjectList;
